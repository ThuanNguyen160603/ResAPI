const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');

// Create a transporter
const transporters = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
  auth: {
     user: 'thuanntps24818@fpt.edu.vn',
      pass: 'hjwwbxvtqqqsiowu'
  },

});

// Configure the template engine
const handlebarOptions = {
  viewEngine: {
    partialsDir: path.resolve('./views/'),
    defaultLayout: false,
  },
  viewPath: path.resolve('./views/'),
  extName: '.hbs',
};

transporters.use('compile', hbs(handlebarOptions));

module.exports = transporters;
