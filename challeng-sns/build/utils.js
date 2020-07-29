"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateToken = exports.sendSecretMail = exports.generateSecret = void 0;

var _nodemailerMailgunTransport = _interopRequireDefault(require("nodemailer-mailgun-transport"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _words = require("./words");

var generateSecret = function generateSecret() {
  var randomNumber = Math.floor(Math.random() * _words.adjectives.length);
  return "".concat(_words.adjectives[randomNumber], " ").concat(_words.nouns[randomNumber]);
};

exports.generateSecret = generateSecret;
console.log(process.env.API_KEY, process.env.DOMAIN);

var sendMail = function sendMail(email) {
  var options = {
    auth: {
      api_key: process.env.API_KEY,
      domain: process.env.DOMAIN
    }
  };

  var client = _nodemailer["default"].createTransport((0, _nodemailerMailgunTransport["default"])(options));

  console.log(client);
  return client.sendMail(email);
}; // const mg = mailgun({apiKey: process.env.API_KEY, domain: process.env.DOMAIN});


var sendSecretMail = function sendSecretMail(address, secret) {
  console.log(address);
  var email = {
    from: "admin@challengram.com",
    to: address,
    subject: "🔒Login Secret for challengram",
    html: "Hello! Your login secret is <strong>".concat(secret, "</strong>.<br/>Copy paste on the app/website to log in")
  };
  return sendMail(email);
};

exports.sendSecretMail = sendSecretMail;

var generateToken = function generateToken(id) {
  return _jsonwebtoken["default"].sign({
    id: id
  }, process.env.JWT_SECRET);
};

exports.generateToken = generateToken;