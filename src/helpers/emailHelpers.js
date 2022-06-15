import emailjs from '@emailjs/browser';

const sendEmail = (obj) => {
    emailjs.send('service_n66x87a', 'template_s8hb4od', obj, 't_ZimR3kvgZrIp5g3')
  .then((result) => {
      console.log(result.text);
  }, (error) => {
      console.log(error.text);
  });
}

export { sendEmail }