import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    searchChallenge: async (_, args) =>
      prisma.posts({
        where: {
          OR: [
            { post_caption_starts_with: args.term }
          ]
        }
      })
  }
};
