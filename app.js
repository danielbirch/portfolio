// DARK MODE TOGGLE
// Reference the IDs and store in a variable
const dark = document.getElementById('dark');
const light = document.getElementById('light');
const html = document.querySelector('html');
// Initialise event listener
dark.addEventListener('click', toggleDarkMode);
light.addEventListener('click', toggleDarkMode);
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
}
// Store light or dark mode in local storage

// Generate portfolio cards based on the number of portfolio files in the /src/projects folder
// Use the FileReader API: https://developer.mozilla.org/en-US/docs/Web/API/FileReader

// Dynamically create and insert icons <li> for project stack based upon the project file

