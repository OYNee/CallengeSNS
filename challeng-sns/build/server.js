"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("./env");

var _graphqlYoga = require("graphql-yoga");

var _prismaClient = require("../generated/prisma-client");

var _morgan = _interopRequireDefault(require("morgan"));

var _schema = _interopRequireDefault(require("./schema"));

var _passport = require("./passport");

var _middlewares = require("./middlewares");

// import { sendSecretMail } from "./utils";
// sendSecretMail("leegj93@gmail.com", 123)
var PORT = process.env.PORT || 4040;
console.log(PORT);
var server = new _graphqlYoga.GraphQLServer({
  schema: _schema["default"],
  context: function context(_ref) {
    var request = _ref.request;
    return {
      request: request,
      isAuthenticated: _middlewares.isAuthenticated
    };
  }
});
server.express.use((0, _morgan["default"])("dev"));
server.express.use(_passport.authenticateJwt);
server.start({
  port: PORT
}, function () {
  return console.log("\u2705 Server running on http://localhost:".concat(PORT));
});