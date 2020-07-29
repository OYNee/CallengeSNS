"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _prismaClient = require("../../../generated/prisma-client");

var _default = {
  Comment: {
    user: function user(_ref) {
      var id = _ref.id;
      return _prismaClient.prisma.comment({
        id: id
      }).user();
    },
    post: function post(_ref2) {
      var id = _ref2.id;
      return _prismaClient.prisma.comment({
        id: id
      }).post();
    }
  }
};
exports["default"] = _default;