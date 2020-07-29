"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _prismaClient = require("../../../generated/prisma-client");

var _default = {
  Room: {
    participants: function participants(_ref) {
      var id = _ref.id;
      return _prismaClient.prisma.room({
        id: id
      }).participants();
    },
    messages: function messages(_ref2) {
      var id = _ref2.id;
      return _prismaClient.prisma.room({
        id: id
      }).messages();
    }
  }
};
exports["default"] = _default;