const nodemailer = require('nodemailer');

const sendEmailToResetPassword = async (options) => {
  // 1. Create a transproter to send the email. e.g. Gmail is a transporter
  //   let transporter = nodemailer.createTransport({
  //     host: process.env.EMAIL_HOST,
  //     port: process.env.EMAIL_PORT,
  //     secure: false, // true for 465, false for other ports
  //     auth: {
  //       user: process.env.EMAIL_USERNAME, // generated ethereal user
  //       pass: process.env.EMAIL_PASSWORD, // generated ethereal password
  //     },
  //   });

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL, // generated ethereal user
      pass: process.env.GMAIL_APP_PASSWORD, // generated ethereal password
    },
  });

  let mailOptions = {
    from: process.env.GMAIL,
    to: options.email,
    subject: options.subject,
    text: options.text,
  };

  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return;
    }

    console.log(info);
    console.log('send mail success!');
  });
};

module.exports = sendEmailToResetPassword;
