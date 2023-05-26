// GLOBAL SCOPE

// MOBILE MENU ACTION
const mobileMenu = document.getElementById("mobile-icon");
mobileMenu.addEventListener("click", openMenu);

function openMenu() {
	const menuToHide = document.getElementById("mobile-menu");
	if (menuToHide.classList.contains("hidden")) {
		menuToHide.classList.toggle("hidden");
		gsap.fromTo(
			menuToHide,
			{ top: -400, duration: 0.5, ease: "power1" },
			{ top: 0, duration: 0.5, ease: "power1" }
		);
	} else {
		gsap.fromTo(
			menuToHide,
			{ top: 0, duration: 0.5, ease: "power1" },
			{ top: -400, duration: 0.5, ease: "power1" }
		);
		setTimeout(() => {
			menuToHide.classList.toggle("hidden");
		}, 500);
	}
}

// DARK MODE TOGGLE V2
const toggleElements = document.querySelectorAll(".toggle-dark-mode");
const dark = document.getElementById("dark");
const light = document.getElementById("light");
const darkMob = document.getElementById("darkmob");
const lightMob = document.getElementById("lightmob");
const htmlUpdate = document.querySelector("html");

toggleElements.forEach((element) => {
	element.addEventListener("click", toggleDarkMode);
});

document.addEventListener("DOMContentLoaded", loadMode);

function toggleDarkMode() {
	if (htmlUpdate.classList.contains("dark")) {
		toggleElements.forEach((element) => {
			element.classList.toggle("hidden");
			htmlUpdate.classList.remove("dark");
		});
	} else {
		toggleElements.forEach((element) => {
			element.classList.toggle("hidden");
			htmlUpdate.classList.add("dark");
		});
	}
	saveMode();
}

// Save dark mode preference in local storage
function saveMode() {
	var saveValue = htmlUpdate.classList.contains("dark");
	localStorage.setItem("Dark Mode", saveValue);
}
// Load dark mode preference on page load
function loadMode(saveValue) {
	const getValue = localStorage.getItem("Dark Mode");
	if (getValue === "true") {
		htmlUpdate.classList.add("dark");
		if (
			dark.classList.contains("hidden") ||
			darkMob.classList.contains("hidden")
		) {
			dark.classList.remove("hidden");
			light.classList.add("hidden");
			darkMob.classList.remove("hidden");
			lightMob.classList.add("hidden");
		}
	} else {
		htmlUpdate.classList.remove("dark");
	}
}

// ADD TOOLTIPS TO SKILL ICONS ON HOVER
const skills = document.querySelectorAll(".skill-item img");

skills.forEach((skill) => {
	const skillSibling = skill.nextElementSibling;
	skill.addEventListener("mouseover", () => {
		skillSibling.classList.remove("hidden");
		gsap.fromTo(
			skillSibling,
			{
				opacity: 0,
				duration: 0.25,
				ease: "power1",
				display: "block",
			},
			{
				opacity: 1,
				duration: 0.25,
				ease: "power1",
			}
		);
	});
	skill.addEventListener("mouseout", () => {
		gsap.fromTo(
			skillSibling,
			{
				opacity: 1,
				duration: 0.25,
				ease: "power1",
			},
			{
				opacity: 0,
				duration: 0.25,
				ease: "power1",
				display: "none",
			}
		);
	});
});

// CONTACT FORM POWERED BY EMAILJS
// Add animated ... to send button after click, once sent, button turns green and message says "Message sent!"
// Show error message on error event below button, use hidden to toggle visibility
// Reload form or another way to reset recaptcha back to normal after submit without page refresh
window.onload = function () {
	document
		.getElementById("contact-form")
		.addEventListener("submit", function (event) {
			event.preventDefault();
			// Generate five digit number for contact_number variable
			this.contact_number.value = (Math.random() * 100000) | 0;
			// // Grab recaptcha response
			var token = grecaptcha.getResponse();
			// Send and error handling
			emailjs
				.sendForm("contact_service", "contact_form",
					this, "_2pCU9m_2a6DSJeRj",
					{ "g-recaptcha-response": token }
				)
				.then(
					function () {
						console.log("Success");
						document
							.getElementById("g-recaptcha")
							.classList.add("hidden");
						const inputs = document.querySelectorAll(
							"#user_name, #user_email, #message"
						);
						inputs.forEach((input) => {
							input.value = "";
						});
					},
					function (error) {
						console.log("Failed", error);
					}
				);
		});
};

let projectData = [];

// PORTFOLIO GRID GENERATION BASED ON JSON OBJECTS
window.onload = function () {
	// Fetch the JSON file
	fetch("./projects.json")
		.then((response) => response.json())
		.then((data) => {
			const projectCount = data.projects.length;
			// Iterate through all objects in JSON
			for (let i = 0; i < projectCount; i++) {
				projectData.push(data.projects[i]);
			}
			renderCards(projectData);
		})
		.catch((error) => {
			console.error(error);
		});
};

function renderCards(projectData) {
	projectData.forEach((project, index) => {
		// console.log(`Index:${index}`, project);
		// Render card on page and set ID's
		const portfolioSection = document.getElementById("portfolio");
		const newProject = document.createElement("div");

		newProject.setAttribute("id", "card-item-" + index); // Alternative `card-item-${index}`
		newProject.setAttribute("class", "card md:max-w-[48%] lg:max-w-[31%]"); // CSS Grid - Tailwind
		portfolioSection.appendChild(newProject);

		// Image Container // rename after 
		const mainImage = document.createElement("div");
		mainImage.setAttribute("id", "main-image-" + index); // Alternative `card-item-${index}`
		mainImage.setAttribute("class", "flex w-full");
		newProject.appendChild(mainImage);

		// Image
		const mainImageSrc = document.createElement("img");
		mainImageSrc.setAttribute("src", project.mainImage);
		mainImageSrc.setAttribute("class", "rounded-xl");
		mainImage.appendChild(mainImageSrc);

		// Card Header DIV
		const cardHeader = document.createElement("div");
		cardHeader.setAttribute("id", "card-header-" + index);
		cardHeader.setAttribute("class", "flex flex-row w-full justify-center content-center px-2 pt-4 pb-3");
		newProject.appendChild(cardHeader);

		// Project name
		const projectNameList = "flex flex-wrap justify-start content-center w-6/12 text-slate-600 font-bold text-md sm:text-lg dark:text-slate-50";
		const projectName = document.createElement("div");
		projectName.setAttribute("id", "project-name-" + index);
		projectName.setAttribute("class", projectNameList);
		projectName.textContent = project.projectName;
		cardHeader.appendChild(projectName);

		// Card Icon Box DIV
		const cardIconBox = document.createElement("div");
		cardIconBox.setAttribute("id", "card-icon-box-" + index);
		cardIconBox.setAttribute("class", "flex justify-end w-6/12");
		cardHeader.appendChild(cardIconBox);

		// UL
		const techUsed = document.createElement("ul");
		techUsed.setAttribute("class", "flex flex-wrap w-full justify-end content-center");
		cardIconBox.appendChild(techUsed);

		// IMG
		const techObject = {
			html: {
				data: project.html,
				src: "./assets/html5.svg",
			},
			css: {
				data: project.css,
				src: "./assets/css3.svg",
			},
			js: {
				data: project.js,
				src: "./assets/javascript.svg",
			},
			vue: {
				data: project.vue,
				src: "./assets/vuejs.svg",
			},
			tailwind: {
				data: project.tailwind,
				src: "./assets/tailwind-css.svg",
			},
			firebase: {
				data: project.firebase,
				src: "./assets/firebase.svg",
			},
		};

		// Iterate over techObject, create new li & show icons if is true
		Object.keys(techObject).forEach((key) => {
			if (techObject[key].data) {
				// Create LI
				const techUsedLi = document.createElement("li");
				techUsedLi.setAttribute("class", "flex flex-nowrap justify-center content-center px-1 w-6 h-4");
				techUsed.appendChild(techUsedLi);
				// Create IMG
				const techImage = document.createElement("img");
				techImage.setAttribute("src", "");
				techImage.setAttribute("src", techObject[key].src);
				techImage.setAttribute("alt", techObject[key].data);
				techUsedLi.appendChild(techImage);
			}
		});

		// Excerpt
		const excerpt = document.createElement("div");
		excerpt.setAttribute("id", "excerpt-" + index);
		excerpt.setAttribute("class", "flex flex-row w-full justify-start content-center px-2 pt-2");
		excerpt.textContent = project.excerpt;
		newProject.appendChild(excerpt);

		// Button Div
		const viewButtonBox = document.createElement("div");
		viewButtonBox.setAttribute("id", "view-button-box-" + index);
		viewButtonBox.setAttribute("class", "flex flex-row w-full justify-center content-center px-2 pt-6");
		newProject.appendChild(viewButtonBox);

		// Button
		let viewButton = document.createElement("a");
		// const rand = Math.floor(Math.random() * 100);
		viewButton.setAttribute("data-id", index);
		viewButton.setAttribute("class", "view-button w-full bg-sky-900 hover:bg-sky-800 transition ease-in-out duration-500 p-3 text-slate-50 text-center rounded-md text-[1.05rem] font-semibold cursor-pointer");
		// viewButton.setAttribute('href', dataRef.link);
		// viewButton.setAttribute('target', '_blank');
		viewButton.textContent = "View Project";
		viewButtonBox.appendChild(viewButton);

		// ADD COMING SOON BUTTON ON TOP OF PROJECT ITEMS
		if (project.development === true) {
			mainImage.classList.add("relative");
			const badge = document.createElement("div");
			badge.textContent = "Coming Soon";
			badge.setAttribute("class", "absolute right-[10px] bottom-[10px] py-1 px-2 text-xs bg-[#00000095] text-slate-50 rounded-md");
			mainImage.appendChild(badge);
		}
	}
	)
};

	// BUILD PROJECT DETAILS PAGE ON CLICK
	setTimeout((projectData) => {
		const portfolioButtons = document.querySelectorAll(".view-button");
		portfolioButtons.forEach((button) => {
			button.addEventListener("click", (e) => {
				const projectId = e.target.dataset.id;
				// console.log(projectData); // Why is this undefined, it's in global scope?
				openPortfolio(projectId);
			});
		});
	}, 1000);

let pWindow = document.getElementById("p-window");
const closeWindow = document.querySelector(".close");

function openPortfolio(projectId) {
	pWindow.classList.toggle("hidden");
	closeWindow.addEventListener("click", windowClose);

	// console.log(projectId);
// This should work, why doesn't it??
	const project = projectData.find((project) => project.id === projectId);

	if (project) {
		console.log('found');

		// Create project title in modal
		const modalTitle = document.createElement("div");
		modalTitle.textContent = project.projectName;
		pWindow.appendChild(modalTitle);

		// Create project image in modal
		const modalImageSrc = document.createElement("img");
		modalImageSrc.setAttribute("src", project.mainImage);
		modalImageSrc.setAttribute("class", "rounded-xl w-[20%]");
		pWindow.appendChild(modalImageSrc);

	} else {
		console.error('Project could not be found.');
	}
}

function windowClose() {
	pWindow.classList.toggle("hidden");
	closeWindow.removeEventListener("click", windowClose);
}






// DYNAMICALLY GENERATE YEAR FOR FOOTER
document.getElementById("year").innerText =
	"\u00A0" + new Date().getFullYear() + "\u00A0";

// LOAD CONTENT FROM README.MD & SHOW ON CHANGELOG PAGE
// Need to setup Webpack first, then use remark-loader (https://www.npmjs.com/package/remark-loader?activeTab=readme)
