const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // Create a transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USERNAME,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  //Define email options
  const mailOptions = {
    from: 'Budget-Plan <yanis.ching@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  //send email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
