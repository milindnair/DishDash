import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';

import ENV from '../config.js';

let nodeConfig = {
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: ENV.EMAIL, // generated ethereal user
      pass: ENV.PASSWORD, // generated ethereal password
    },
  }

let transporter = nodemailer.createTransport(nodeConfig);

let MailGenerator = new Mailgen({
    theme: 'default',
    product: {
        name:"Mailgen",
        link: "https://mailgen.js/"
    }
});

export const registerMail = async (req, res) => {
    const {username,userEmail,text,subject} = req.body;

    //body of the the email
    var email = {
        body: {
            name: username,
            intro: text || "Welcome to Mailgen! We're very excited to have you on board.",
            outro: "Need help, or have questions? Just reply to this email, we'd love to help."
        }
    }

    var emailBody = MailGenerator.generate(email);
    let message = {
        from: ENV.EMAIL,
        to: userEmail,
        subject: subject || "Signup successful",
        html: emailBody
    }

    transporter.sendMail(message)
    .then(() => {
        return res.status(200).send({message: "Your should receive an email from us shortly"});
    })
    .catch((err) => {
        return res.status(500).send({error: "Email not sent"});
    });
}