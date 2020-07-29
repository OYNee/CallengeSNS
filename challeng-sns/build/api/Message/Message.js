"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _prismaClient = require("../../../generated/prisma-client");

var _default = {
  Message: {
    from: function from(_ref) {
      var id = _ref.id;
      return _prismaClient.prisma.message({
        id: id
      }).from();
    },
    to: function to(_ref2) {
      var id = _ref2.id;
      return _prismaClient.prisma.message({
        id: id
      }).to();
    },
    room: function room(_ref3) {
      var id = _ref3.id;
      return _prismaClient.prisma.message({
        id: id
      }).room();
    }
  }
};
exports["default"] = _default;