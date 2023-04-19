const nodemailer = require('nodemailer');

const sendEmailToResetPassword = async (options) => {
  // 1. Create a transproter to send the email. e.g. Gmail is a transporter
  let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USERNAME, // generated ethereal user
      pass: process.env.EMAIL_PASSWORD, // generated ethereal password
    },
  });

  // 2. Set up the email options e.g. receivers, email body, subject etc and send the email
  let info = await transporter.sendMail({
    from: '"Chaegyul 👻" <admin@example.com>', // sender address
    to: options.email, // list of receivers
    subject: options.subject, // Subject line
    text: options.text, // plain text body
  });
};

module.exports = sendEmailToResetPassword;
