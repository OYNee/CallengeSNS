import { prisma } from "../../../../generated/prisma-client";
//파일 업로드를 위해서 로그인이 필수이므로 isAuthenticated를 통해 로그인을 확인
export default {
  Mutation: {
    upload: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { caption, files } = args;
      const post = await prisma.createPost({
        caption,
        user: { connect: { id: user.id } }
      });
      files.forEach(
        async file =>
          await prisma.createFile({
            url: file,
            post: {
              connect: {
                id: post.id
              }
            }
          })
      );
      return post;
    }
  }
};