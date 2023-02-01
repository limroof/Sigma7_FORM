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
    html:
      "<h1>Confirmation de réception</h1><p>Ceci est un courriel pour vous confimer que nous avons bien reçu votre message</p><p><strong>Voici les informations fournis :</strong><br/><strong>Nom : " +
      req.body.name +
      "</strong></br><strong>Numéro : " +
      req.body.telephone +
      "</strong></br><strong>E-mail : " +
      req.body.email +
      "</strong></br><strong>message : " +
      req.body.message +
      "</strong></br></p>",
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
