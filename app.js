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




// CONTACT FORM INTEGRATE WITH EMAILJS FOR SENDING EMAILS (https://www.emailjs.com/)
// Validation (fields empty, is email, spam protection?)

// PORTFOLIO GRID GENERATION BASED ON FILES IN /PROJECTS FOLDER
// Generate portfolio cards based on the number of portfolio files in the /projects folder
// Use the FileReader API: https://developer.mozilla.org/en-US/docs/Web/API/FileReader
// Dynamically create and insert icons <li> for project stack based upon the project file

// DYNAMICALLY GENERATE YEAR FOR FOOTER

// LOAD CONTENT FROM README.MD & SHOW ON CHANGELOG PAGE

