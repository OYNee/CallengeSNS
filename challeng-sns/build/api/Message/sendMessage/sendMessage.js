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
  Mutation: {
    sendMessage: function () {
      var _sendMessage = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, args, _ref) {
        var request, isAuthenticated, user, roomId, message, toId, room, participants, getTo;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                request = _ref.request, isAuthenticated = _ref.isAuthenticated;
                isAuthenticated(request);
                user = request.user;
                roomId = args.roomId, message = args.message, toId = args.toId;

                if (!(roomId === undefined)) {
                  _context.next = 11;
                  break;
                }

                if (!(user.id !== toId)) {
                  _context.next = 9;
                  break;
                }

                _context.next = 8;
                return _prismaClient.prisma.createRoom({
                  participants: {
                    connect: [{
                      id: toId
                    }, {
                      id: user.id
                    }]
                  }
                });

              case 8:
                room = _context.sent;

              case 9:
                _context.next = 14;
                break;

              case 11:
                _context.next = 13;
                return _prismaClient.prisma.room({
                  id: roomId
                });

              case 13:
                room = _context.sent;

              case 14:
                if (room) {
                  _context.next = 16;
                  break;
                }

                throw Error("Room not found");

              case 16:
                _context.next = 18;
                return _prismaClient.prisma.room({
                  id: room.id
                }).participants();

              case 18:
                participants = _context.sent;
                getTo = participants.filter(function (participant) {
                  return participant.id !== user.id;
                })[0];
                return _context.abrupt("return", _prismaClient.prisma.createMessage({
                  text: message,
                  from: {
                    connect: {
                      id: user.id
                    }
                  },
                  to: {
                    connect: {
                      id: roomId ? getTo.id : toId
                    }
                  },
                  room: {
                    connect: {
                      id: room.id
                    }
                  }
                }));

              case 21:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function sendMessage(_x, _x2, _x3) {
        return _sendMessage.apply(this, arguments);
      }

      return sendMessage;
    }()
  }
};
exports["default"] = _default;