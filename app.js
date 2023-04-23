// DARK MODE TOGGLE
// Reference the IDs and store in a variable
const dark = document.getElementById('dark');
const light = document.getElementById('light');
const html = document.querySelector('html');
// Initialise event listener
dark.addEventListener('click', toggleDarkMode);
light.addEventListener('click', toggleDarkMode);
document.addEventListener('DOMContentLoaded', loadMode);
// Toggle class 'hidden' on icons and class 'dark' on HTML tag
function toggleDarkMode() {
  if (html.classList.contains('dark')) {
    dark.classList.toggle('hidden');
    light.classList.toggle('hidden');
    html.classList.remove('dark');
  } else {
    light.classList.toggle('hidden');
    dark.classList.toggle('hidden');
    html.classList.add('dark');
  }
  saveMode();
}
// Save dark mode preference in local storage
function saveMode() {
  var saveValue = html.classList.contains('dark');
  localStorage.setItem('Dark Mode', saveValue);
}
// Load dark mode preference on page load
function loadMode(saveValue) {
  const getValue = localStorage.getItem('Dark Mode');
  if (getValue === 'true') {
    html.classList.add('dark');
      if (dark.classList.contains('hidden')) {
        dark.classList.remove('hidden');
        light.classList.add('hidden');
      }
  } else {
    html.classList.remove('dark');
    }
}

// ADD TOOLTIPS TO SKILL ICONS ON HOVER
const skills = document.querySelectorAll('#skill-item img');

skills.forEach((skill) => {
  const skillSibling = skill.nextElementSibling;
  skill.addEventListener('mouseover', () => {
    skillSibling.classList.remove('hidden');
    gsap.fromTo(skillSibling, {
      opacity: 0,
      duration: 0.25,
      ease: "power1",
      display: "block"
    }, {
      opacity: 1,
      duration: 0.25,
      ease: "power1"
    });
  });
  skill.addEventListener('mouseout', () => {
    gsap.fromTo(skillSibling, {
      opacity: 1,
      duration: 0.25,
      ease: "power1"
    }, {
      opacity: 0,
      duration: 0.25,
      ease: "power1",
      display: "none"
    });
  });
});

// CONTACT FORM POWERED BY EMAILJS
// Add animated ... to send button after click, once sent, button turns green and message says "Message sent!"
// Show error message on error event below button, use hidden to toggle visibility
// Reload form or another way to reset recaptcha back to normal after submit without page refresh
window.onload = function () {
  document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault();
    // Generate five digit number for contact_number variable
    this.contact_number.value = Math.random() * 100000 | 0;
    // // Grab recaptcha response
    var token = grecaptcha.getResponse();
    // Send and error handling
    emailjs.sendForm('contact_service', 'contact_form', this, '_2pCU9m_2a6DSJeRj', { 'g-recaptcha-response': token })
      .then(function () {
        console.log('Success');
        document.getElementById('g-recaptcha').classList.add('hidden');
        const inputs = document.querySelectorAll('#user_name, #user_email, #message');
        inputs.forEach(input => {
          input.value = '';
        });
      }, function (error) {
        console.log('Failed', error);
      });
  });
}

// PORTFOLIO GRID GENERATION BASED ON JSON OBJECTS
window.onload = function () {
  // Fetch the JSON file
  fetch('./projects.json')
    .then(response => response.json())
    .then(data => {
      const projectCount = data.projects.length;
      // Iterate through all objects in JSON
      for(i = 0; i < projectCount; i++) {
        const projectData = data.projects[i];
        renderCards(projectData);
      }
    })
    .catch(error => {
      console.error(error);
    });
}

function renderCards(dataRef) {
  // Render card on page and set ID's
  const portfolioSection = document.getElementById('portfolio');
  const newProject = document.createElement('div');
  newProject.setAttribute('id', 'card-item');
  newProject.setAttribute('class', 'card');
  portfolioSection.appendChild(newProject);

  // Main image
  const mainImage = document.createElement('div');
  mainImage.setAttribute('id', 'main-image');
  mainImage.setAttribute('class', 'flex w-full');
  newProject.appendChild(mainImage);
  // IMG
  const mainImageSrc = document.createElement('img');
  mainImageSrc.setAttribute('src', dataRef.mainImage);
  mainImageSrc.setAttribute('class', 'rounded-xl');
  mainImage.appendChild(mainImageSrc);

  // Container 1 DIV
  const container1 = document.createElement('div');
  container1.setAttribute('id', 'container-1');
  container1.setAttribute('class', 'flex flex-row w-full justify-center content-center px-2 pt-4 pb-3');
  newProject.appendChild(container1);

  // Project name
  const projectNameList = "flex flex-wrap justify-start content-center w-6/12 text-slate-600 font-bold text-lg";
  const projectName = document.createElement('div');
  projectName.setAttribute('id', 'project-name');
  projectName.setAttribute('class', projectNameList);
  projectName.textContent = dataRef.projectName;
  container1.appendChild(projectName);

  // Container 2 DIV
  const container2 = document.createElement('div');
  container2.setAttribute('id', 'container-2');
  container2.setAttribute('class', 'flex justify-end w-6/12');
  container1.appendChild(container2);

  // UL
  const techUsed = document.createElement('ul');
  techUsed.setAttribute('class', 'flex flex-wrap w-full justify-end content-center');
  container2.appendChild(techUsed);

  // IMG
  const techObject = {
    "html": {
      "data": dataRef.html,
      "src": "./assets/html5.svg"
    },
    "css": {
      "data": dataRef.css,
      "src": "./assets/css3.svg"
    },
    "js": {
      "data": dataRef.js,
      "src": "./assets/javascript.svg"
    },
    "vue": {
      "data": dataRef.vue,
      "src": "./assets/vuejs.svg"
    },
    "tailwind": {
      "data": dataRef.tailwind,
      "src": "./assets/tailwind-css.svg"
    },
    "firebase": {
      "data": dataRef.firebase,
      "src": "./assets/firebase.svg"
    }
  };

  // Iterate over techObject, create new li & show icons if is true
  Object.keys(techObject).forEach(key => {
    if (techObject[key].data) {
      // Create LI
      const techUsedLi = document.createElement('li');
      techUsedLi.setAttribute('class', 'flex flex-nowrap justify-center content-center px-1 w-6 h-4');
      techUsed.appendChild(techUsedLi);
      // Create IMG 
      const techImage = document.createElement('img');
      techImage.setAttribute('id', 'tech-used');
      techImage.setAttribute('src', '');
      techImage.setAttribute('src', techObject[key].src);
      techImage.setAttribute('alt', techObject[key].data);
      techUsedLi.appendChild(techImage);
    }
  });
  
  // Excerpt
  const excerpt = document.createElement('div');
  excerpt.setAttribute('id', 'excerpt');
  excerpt.setAttribute('class', 'flex flex-row w-full justify-start content-center px-2 pt-2');
  excerpt.textContent = dataRef.excerpt;
  newProject.appendChild(excerpt);
  
  // Button Div
  const viewButtonBox = document.createElement('div');
  viewButtonBox.setAttribute('id', 'view-button');
  viewButtonBox.setAttribute('class', 'flex flex-row w-full justify-center content-center px-2 pt-6');
  newProject.appendChild(viewButtonBox);
  // Button
  const viewButton = document.createElement('a');
  viewButton.setAttribute('class', 'w-full bg-sky-900 hover:bg-sky-800 transition ease-in-out duration-500 p-3 text-slate-50 text-center rounded-md text-[1.05rem] font-semibold');
  viewButton.setAttribute('href', dataRef.link);
  viewButton.setAttribute('target', '_blank');
  viewButton.textContent = "View Project";
  viewButtonBox.appendChild(viewButton);

    // ADD COMING SOON BUTTON ON TOP OF PROJECT ITEMS
  if(dataRef.development === true) {
    mainImage.classList.add('relative');
    const badge = document.createElement('div');
    badge.textContent = "Coming Soon";
    badge.setAttribute('class', 'absolute right-[10px] bottom-[10px] py-1 px-2 text-xs bg-[#00000095] text-slate-50 rounded-md');
    mainImage.appendChild(badge);
  }
}



// DYNAMICALLY GENERATE YEAR FOR FOOTER
document.getElementById('year').innerText = "\u00A0" + new Date().getFullYear() + "\u00A0";

// LOAD CONTENT FROM README.MD & SHOW ON CHANGELOG PAGE
// Need to setup Webpack first, then use remark-loader (https://www.npmjs.com/package/remark-loader?activeTab=readme)
// import md from "README.md";

// console.log(md);