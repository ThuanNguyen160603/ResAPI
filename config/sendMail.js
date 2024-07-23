const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: 'thuanntps24818@fpt.edu.vn',
      pass: 'hjwwbxvtqqqsiowu'
    }
  });

module.exports = { transporter };
