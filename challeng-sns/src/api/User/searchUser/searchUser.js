import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    searchUser: async (_, args) =>
      prisma.users({
        where: {
          OR: [
            { username_contains: args.term },//유저네임으로 찾기
            { firstName_contains: args.term },//이름으로 찾기
            { lastName_contains: args.term }//성으로 찾기
          ]
        }
      })
  }
};