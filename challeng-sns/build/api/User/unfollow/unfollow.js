"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _middlewares = require("../../../middlewares");

var _prismaClient = require("../../../../generated/prisma-client");

var _default = {
  Mutation: {
    unfollow: function () {
      var _unfollow = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, args, _ref) {
        var request, id, user;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                request = _ref.request;
                (0, _middlewares.isAuthenticated)(request);
                id = args.id;
                user = request.user;
                _context.prev = 4;
                _context.next = 7;
                return _prismaClient.prisma.updateUser({
                  where: {
                    id: user.id
                  },
                  data: {
                    following: {
                      disconnect: {
                        id: id
                      }
                    }
                  }
                });

              case 7:
                return _context.abrupt("return", true);

              case 10:
                _context.prev = 10;
                _context.t0 = _context["catch"](4);
                return _context.abrupt("return", false);

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[4, 10]]);
      }));

      function unfollow(_x, _x2, _x3) {
        return _unfollow.apply(this, arguments);
      }

      return unfollow;
    }()
  }
};
exports["default"] = _default;