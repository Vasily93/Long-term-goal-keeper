import emailjs from '@emailjs/browser';

const sendEmail = (obj) => {
    emailjs.send(serviceID, templateID, templateParams, publicKey)
  .then((result) => {
      console.log(result.text);
  }, (error) => {
      console.log(error.text);
  });
}

export { sendEmail }
