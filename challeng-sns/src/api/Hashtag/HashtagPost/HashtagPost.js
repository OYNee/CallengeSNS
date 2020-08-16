import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        followingUser: async (_, args) =>
          prisma.hashtag({tag_name:args.tag_name}).posts({
            first:args.limit,
            skip: args.cur
          })
        }
  };
  