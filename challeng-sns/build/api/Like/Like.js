"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _prismaClient = require("../../../generated/prisma-client");

var _default = {
  Like: {
    post: function post(_ref) {
      var id = _ref.id;
      return _prismaClient.prisma.like({
        id: id
      }).post();
    },
    user: function user(_ref2) {
      var id = _ref2.id;
      return _prismaClient.prisma.like({
        id: id
      }).user();
    }
  }
};
exports["default"] = _default;