# Personal Portfolio

My Frontend Web Developer portfolio to showcase my skills and projects. Built using vanilla JavaScript and Tailwind CSS.

[Open DanielBirch.dev →](https://danielbirch.dev/)

## Development Checklist 💻

- [ ] Create a function that sends a test email every week using the contact form to ensure it always works
- [ ] Setup a loading icon which shows (instead of the button text) when a form submission is sending. Upon successful send, the button turns green with a white tick.
- [ ] Redesign close on portfolio items, red box, white close text or font awesome X

## Changelog 🪵

#### 26-10-2023 - Fix contact form sending issue. Remove phone number from page.

Getting Google Recaptcha to work has been a pain, but it's working now. There isn't any complete documentation online for integrating EmailJs and Google Recaptcha, only partial information and code snippets. The following is what worked for me:
	
I use the EmailJS public key in the sendForm() method, instead of adding the init script within the html file. I also passed the recaptcha response object into the sendForm() method and used 'this' to pass the form field values.

## Credits 👤

Built by [Daniel Birch](https://danielbirch.dev/)