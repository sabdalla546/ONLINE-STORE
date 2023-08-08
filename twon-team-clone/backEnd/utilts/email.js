const nodemailer = require('nodemailer');

const sendEmail = async options => {
    // create transporter
    var transport = nodemailer.createTransport({
       service: 'Gmail',
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD
        }
      });
      // 2) Define the email options
  const mailOptions = {
    from: '<sabdalla546@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.htm,
    // html:
  };

  // 3) Actually send the email
  await transport.sendMail(mailOptions);
}
module.exports = sendEmail ;