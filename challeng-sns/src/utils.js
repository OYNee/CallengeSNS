import dotenv from "dotenv";
import path from "path";
import nodemailer from "nodemailer";
//import sgTransport  from "nodemailer-sendgrid-transport";
import mgTransport from "nodemailer-mailgun-transport"
import  sendgrid  from "@sendgrid/mail";
dotenv.config({ path: path.resolve(__dirname, ".env") });

import { adjectives, nouns } from "./words";

export const generateSecret = () => {
  const randomNumber = Math.floor(Math.random() * adjectives.length);
  return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};
console.log( process.env.API_KEY, process.env.DOMAIN)
//sendgrid.setApiKey(process.env.SENDGRID_API_KEY)
const sendMail = email => {
    const options = {
      auth: {
        api_key: process.env.API_KEY,
        domain: process.env.DOMAIN
      }
    };
    const client = nodemailer.createTransport(mgTransport(options));
    return client.sendMail(email);
  };


 // const mg = mailgun({apiKey: process.env.API_KEY, domain: process.env.DOMAIN});
  export const sendSecretMail = (address, secret) => {
    const email = {
      from: "admin@challengram.com",
      to: address,
      subject: "🔒Login Secret for challengram",
      html: `Hello! Your login secret is <strong>${secret}</strong>.<br/>Copy paste on the app/website to log in`
    };
    return sendMail(email);
  };