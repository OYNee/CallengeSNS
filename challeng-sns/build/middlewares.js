"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAuthenticated = void 0;

var isAuthenticated = function isAuthenticated(request) {
  if (!request.user) {
    throw Error("You need to log in to perform this action");
  }

  return;
};

exports.isAuthenticated = isAuthenticated;