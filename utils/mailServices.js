const nodemailer = require("nodemailer");
const { verificationMailTemplate } = require("./mailTemplate");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODE_MAILER_USER || "",
    pass: process.env.NODE_MAILER_USER_PASS || "",
  },
});

const sendVerificationMail = async (data, token) => {
  const html = await verificationMailTemplate(data, token);
  return new Promise((resolve, reject) => {
    try {
      const mailOptions = {
        from: "no-reply@gmail.com",
        to: data.email,
        subject: "Account Verification",
        html: html,
      };
      transporter.sendMail(mailOptions, (err) => {
        if (err) {
          reject(err);
        }
        resolve();
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  sendVerificationMail,
};
