import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    editUser: (_, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      return prisma.deleteUser({
        where: { id: user.id },
      });
    },
  },
};
