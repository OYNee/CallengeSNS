import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    searchPost: async (_, args) =>
      prisma.posts({
        where: {
          OR: [
            { location_starts_with: args.term },//지역으로 찾기
            { caption_starts_with: args.term }//설명으로 찾기
          ]
        }
      })
  }
};