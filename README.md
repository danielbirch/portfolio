# portfolio

My Frontend Web Developer portfolio to showcase my skills and projects.

### Adding Google Recaptcha

Getting Google Recaptcha to work has been a pain, but it's working now. There isn't any complete documentation online for integrating EmailJs and Google Recaptcha, only partial information and code snippets. The following is what worked for me:

I use the EmailJS public key in the sendForm() method, instead of adding the init script within the html file. I also passed the recaptcha response object into the sendForm() method and used 'this' to pass the form field values.
