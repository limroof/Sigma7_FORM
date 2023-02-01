require("dotenv").config();
var nodemailer = require("nodemailer");

exports.sendEmail = (req, res) => {
  var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    secureConnection: true,
    port: 465,
    auth: {
      type: "login",
      user: process.env.EMAIL_FROM,
      pass: process.env.GMAIL_APPLICATION_PASSWORD,
    },
    tls: { rejectUnauthorized: false },
  });

  var mailOptions = {
    from: process.env.EMAIL_FROM,
    to: req.body.email,
    subject: "Sending Email using Node.js",
    text: req.body.message,
    html: "<h1>Welcome</h1><p>That was easy!</p>",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.status(500).send({ ok: false });
    } else {
      res.status(201).send({ ok: true });
    }
  });
};
