import { prisma } from "../../../generated/prisma-client";

export default {
  Hashtag: {
    postCount: (parent) =>
      prisma
        .postsConnection({
          where: { post: { id: parent.id } },
        })
        .aggregate()
        .count(),
  },
};
