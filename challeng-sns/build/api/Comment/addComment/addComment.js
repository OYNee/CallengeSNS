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
    addComment: function () {
      var _addComment = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, args, _ref) {
        var request, text, postId, user, comment;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                request = _ref.request;
                (0, _middlewares.isAuthenticated)(request);
                text = args.text, postId = args.postId;
                user = request.user;
                _context.next = 6;
                return _prismaClient.prisma.createComment({
                  user: {
                    connect: {
                      id: user.id
                    }
                  },
                  post: {
                    connect: {
                      id: postId
                    }
                  },
                  text: text
                });

              case 6:
                comment = _context.sent;
                return _context.abrupt("return", comment);

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function addComment(_x, _x2, _x3) {
        return _addComment.apply(this, arguments);
      }

      return addComment;
    }()
  }
};
exports["default"] = _default;