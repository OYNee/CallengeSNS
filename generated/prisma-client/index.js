"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "User",
    embedded: false
  },
  {
    name: "Post",
    embedded: false
  },
  {
    name: "File",
    embedded: false
  },
  {
    name: "Room",
    embedded: false
  },
  {
    name: "Message",
    embedded: false
  },
  {
    name: "Like",
    embedded: false
  },
  {
    name: "Comment",
    embedded: false
  },
  {
    name: "Video",
    embedded: false
  },
  {
    name: "Image",
    embedded: false
  },
  {
    name: "Audio",
    embedded: false
  },
  {
    name: "Text",
    embedded: false
  },
  {
    name: "Category",
    embedded: false
  },
  {
    name: "Hashtag",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `https://eu1.prisma.sh/leegj93-7a6e42/prismagram/dev`
});
exports.prisma = new exports.Prisma();
