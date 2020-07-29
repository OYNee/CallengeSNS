"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _prismaClient = require("../../../generated/prisma-client");

var _default = {
  User: {
    posts: function posts(_ref) {
      var id = _ref.id;
      return _prismaClient.prisma.user({
        id: id
      }).posts();
    },
    following: function following(_ref2) {
      var id = _ref2.id;
      return _prismaClient.prisma.user({
        id: id
      }).following();
    },
    followers: function followers(_ref3) {
      var id = _ref3.id;
      return _prismaClient.prisma.user({
        id: id
      }).followers();
    },
    likes: function likes(_ref4) {
      var id = _ref4.id;
      return _prismaClient.prisma.user({
        id: id
      }).likes();
    },
    comments: function comments(_ref5) {
      var id = _ref5.id;
      return _prismaClient.prisma.user({
        id: id
      }).comments();
    },
    rooms: function rooms(_ref6) {
      var id = _ref6.id;
      return _prismaClient.prisma.user({
        id: id
      }).rooms();
    },
    followingCount: function followingCount(_ref7) {
      var id = _ref7.id;
      return _prismaClient.prisma.usersConnection({
        where: {
          followers_some: {
            id: id
          }
        }
      }).aggregate().count();
    },
    followersCount: function followersCount(_ref8) {
      var id = _ref8.id;
      return _prismaClient.prisma.usersConnection({
        where: {
          following_none: {
            id: id
          }
        }
      }).aggregate().count();
    },
    fullName: function fullName(parent) {
      return "".concat(parent.firstName, " ").concat(parent.lastName);
    },
    isFollowing: function () {
      var _isFollowing = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(parent, _, _ref9) {
        var request, user, parentId;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                request = _ref9.request;
                user = request.user;
                parentId = parent.id;
                _context.prev = 3;
                return _context.abrupt("return", _prismaClient.prisma.$exists.user({
                  AND: [{
                    id: user.id
                  }, {
                    following_some: {
                      id: parentId
                    }
                  }]
                }));

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](3);
                return _context.abrupt("return", false);

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[3, 7]]);
      }));

      function isFollowing(_x, _x2, _x3) {
        return _isFollowing.apply(this, arguments);
      }

      return isFollowing;
    }(),
    isSelf: function isSelf(parent, _, _ref10) {
      var request = _ref10.request;
      var user = request.user;
      var parentId = parent.id;
      return user.id === parentId;
    }
  }
};
exports["default"] = _default;