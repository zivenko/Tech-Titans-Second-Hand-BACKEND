import "dotenv/config";
import nodemailer from "nodemailer";

const { EMAIL_USER, EMAIL_PASSWORD } = process.env;

const config = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(config);

const sendEmail = (data) => {
  const email = { ...data, from: EMAIL_USER };
  return transporter.sendMail(email);
};

export default sendEmail;
