const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'cameron.greenfelder@ethereal.email',
        pass: 'yM28cdQqR115xSADmP'
    }
  });

  const mailOptions = {
    from: 'no-reply@example.com',
    to: options.email,
    subject: options.subject,
    text: options.text,
    html: options.html

  };
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
