
import mgTransport from "nodemailer-mailgun-transport"
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

import { adjectives, nouns } from "./words";

export const generateSecret = () => {
  const randomNumber = Math.floor(Math.random() * adjectives.length);
  return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};
console.log( process.env.API_KEY, process.env.DOMAIN)
const sendMail = email => {
    const options = {
      auth: {
        api_key: process.env.API_KEY,
        domain: process.env.DOMAIN
      }
    };
    const client = nodemailer.createTransport(mgTransport(options));
    // console.log(client)
    return client.sendMail(email);
  };


 // const mg = mailgun({apiKey: process.env.API_KEY, domain: process.env.DOMAIN});

  export const sendSecretMail = (address, secret) => {
    console.log(address)
    console.log("email:")
    const email = {
      from: "admin@challengram.com",
      to: address,
      subject: "🔒Login Secret for challengram",
      html: `Hello! Your login secret is <strong>${secret}</strong>.<br/>Copy paste on the app/website to log in`
    };
    return sendMail(email);
  };

  export const generateToken = id => jwt.sign({ id }, process.env.JWT_SECRET);