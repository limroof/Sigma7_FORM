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
    subject: "Confirmation de message",
    text: req.body.message,
    html:
      "<h1>Confirmation de réception</h1><p>Ceci est un courriel pour vous confimer que nous avons bien reçu votre message</p><p><strong>Voici les informations fournies :</strong><br/><strong>Nom : " +
      req.body.name +
      "</strong><br><strong>Numéro : " +
      req.body.telephone +
      "</strong><br><strong>E-mail : " +
      req.body.email +
      "</strong><br><strong>message : " +
      req.body.message +
      "</strong><br></p>",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.status(500).send({ ok: false });
    } else {
      res.status(201).send({ ok: true });
    }
  });

  var mailAdmin = {
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_FROM,
    subject: "Nouveau message pour Sigma7",
    text: req.body.message,
    html:
      "<h1>Nouveau message pour Sigma7</h1><p><strong>Voici les informations fournies :</strong></p><strong>Nom : </strong>" +
      req.body.name +
      "<br><strong>Numéro : </strong>" +
      req.body.telephone +
      "<br><strong>E-mail : </strong>" +
      req.body.email +
      "<br><strong>message : </strong>" +
      req.body.message +
      "</p>",
  };

  transporter.sendMail(mailAdmin, function (error, info) {
    if (error) {
      console.log(error);
      res.status(500).send({ ok: false });
    } else {
      res.status(201).send({ ok: true });
    }
  });
};
