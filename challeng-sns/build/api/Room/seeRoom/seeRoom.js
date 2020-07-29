"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _prismaClient = require("../../../../generated/prisma-client");

var _default = {
  Query: {
    seeRoom: function () {
      var _seeRoom = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, args, _ref) {
        var request, isAuthenticated, id, user, canSee;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                request = _ref.request, isAuthenticated = _ref.isAuthenticated;
                isAuthenticated(request);
                id = args.id;
                user = request.user;
                _context.next = 6;
                return _prismaClient.prisma.$exists.room({
                  participants_some: {
                    id: user.id
                  }
                });

              case 6:
                canSee = _context.sent;

                if (!canSee) {
                  _context.next = 11;
                  break;
                }

                return _context.abrupt("return", _prismaClient.prisma.room({
                  id: id
                }));

              case 11:
                throw Error("You can't see this");

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function seeRoom(_x, _x2, _x3) {
        return _seeRoom.apply(this, arguments);
      }

      return seeRoom;
    }()
  }
};
exports["default"] = _default;