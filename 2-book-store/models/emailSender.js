// nodemailer to send emails

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "mail.coding-school.org",
  port: 465,
  auth: {
    user: "fbw46-2@coding-school.org",
    pass: "fbw46-2",
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false,
  },
});

function sendEmail(name, email, message, callback) {
  const mailOption = {
    from: "fbw46-2@coding-school.org",
    to: "ahmad.osman@digitalcareerinstitute.org",
    subject: "message from your website",
    text:  "\n" + email + "\n" + name + "\n" + message,
  };
  transporter.sendMail(mailOption, function (error, info) {
    if (error) {
      console.log(error);
      callback(false);
    } else {
      console.log(info.response);
      callback(true);
    }
  });
}

module.exports = { sendEmail };
