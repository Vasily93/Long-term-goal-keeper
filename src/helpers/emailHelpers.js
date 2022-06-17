import emailjs from '@emailjs/browser';

const serviceID= process.env.REACT_APP_SERVICE_ID;
const templateID= process.env.REACT_APP_TEMPLATE_ID;
const publicKey = process.env.REACT_APP_PUBLIC_KEY;
console.log(serviceID, templateID, publicKey)
const sendEmail = (obj) => {
    emailjs.send(serviceID, templateID, obj, publicKey)
  .then((result) => {
      console.log(result.text);
  }, (error) => {
      console.log(error.text);
  });
}

export { sendEmail }
