import { prisma } from "../../../generated/prisma-client";

export default {
  Hashtag: {
    postCount: (parent) =>
      prisma
        .postsConnection({
          where: { Hashtag: { id: parent.id } },
        })
        .aggregate()
        .count(),
  },
};
