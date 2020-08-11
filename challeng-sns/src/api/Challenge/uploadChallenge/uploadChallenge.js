import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    uploadChallenge: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      console.log(user.id);

      const {
        caption,
        category,
        // newPost,
        rel_challengers,
        pre_challengers,
        next_challengers,
        tag_challengers,
        // scope,
        files,
        postId,
      } = args;
      //지금 args 에서 받아오는 부분이 이부분인데
      //category로 구분 중이면서 파일에서 처리할 수 있는 부분을 나눠놓는건 좀 낭비 같다는 생각이 좀 들어서요

      // console.log(rel_persons)
      const making_hashtag = caption.split(" ");

      //나중에 scope랑 newPost 삭제
      const scope = true;
      const newPost = true;
      try {
        const post = await prisma.createPost({
          scope,
          newPost,
          caption,
          category,
          user: { connect: { id: user.id } },
          postId: postId,
        });

        if (postId === "") {
          await prisma.updatePost({
            where: {
              id: post.id,
            },
            data: {
              postId: post.id,
            },
          });
        }

        //Relation_challenger에 관한 함수
        //여러명의 값이 들어갈 수 있기 때문에 forEach문으로 작성
        if (rel_challengers != null) {
          rel_challengers.forEach(
            async (rel_challenger) =>
              //그냥은 들어가지 않아서 update유저로 갱신을 시켜주는 방식으로 제작하였습니다.
              await prisma.updateUser({
                data: {
                  relChallenger: {
                    connect: { id: post.id },
                  },
                },
                where: { username: rel_challenger },
              }),
            async (rel_challenger) =>
              await prisma.updatePost({
                data: {
                  relChallenger: {
                    connect: { username: rel_challenger },
                  },
                },
                where: { id: post.id },
              })
          );
        }

        console.log(pre_challengers);
        console.log("aa");
        if (pre_challengers != null) {
          pre_challengers.forEach(
            async (pre_challenger) =>
              //그냥은 들어가지 않아서 update유저로 갱신을 시켜주는 방식으로 제작하였습니다.
              await prisma.updateUser({
                data: {
                  preChallenger: {
                    connect: { id: post.id },
                  },
                },
                where: { username: pre_challenger },
              }),
            async (pre_challenger) =>
              await prisma.updatePost({
                data: {
                  preChallenger: {
                    connect: { username: pre_challenger },
                  },
                },
                where: { id: post.id },
              })
          );
        }
        if (next_challengers != "" || next_challengers != null) {
          next_challengers.forEach(
            async (next_challenger) =>
              //그냥은 들어가지 않아서 update유저로 갱신을 시켜주는 방식으로 제작하였습니다.
              await prisma.updateUser({
                data: {
                  nextChallenger: {
                    connect: { id: post.id },
                  },
                },
                where: { username: next_challenger },
              }),
            async (next_challenger) =>
              await prisma.updatePost({
                data: {
                  nextChallenger: {
                    connect: { username: next_challenger },
                  },
                },
                where: { id: post.id },
              })
          );
        }
        if (tag_challengers != "" || tag_challengers != null) {
          tag_challengers.forEach(
            async (tag_challenger) =>
              //그냥은 들어가지 않아서 update유저로 갱신을 시켜주는 방식으로 제작하였습니다.
              await prisma.updateUser({
                data: {
                  tagChallenger: {
                    connect: { id: post.id },
                  },
                },
                where: { username: tag_challenger },
              }),
            async (tag_challenger) =>
              await prisma.updatePost({
                data: {
                  tagChallenger: {
                    connect: { username: tag_challenger },
                  },
                },
                where: { id: post.id },
              })
          );
        }

        making_hashtag.forEach(async (hashtag) => {
          if (hashtag.includes("#")) {
            await prisma.createHashtag({
              tag_name: hashtag,
              post: {
                connect: {
                  id: post.id,
                },
              },
            });
          }
        });
        if (category == "video") {
          files.forEach(
            async (file) =>
              await prisma.createVideo({
                video_url: file,
                post: {
                  connect: {
                    id: post.id,
                  },
                },
              })
          );
        } else if (category == "audio") {
          files.forEach(
            async (file) =>
              await prisma.createAudio({
                audio_url: file,
                post: {
                  connect: {
                    id: post.id,
                  },
                },
              })
          );
        } else if (category == "image") {
          files.forEach(
            async (file) =>
              await prisma.createImage({
                image_url: file,
                post: {
                  connect: {
                    id: post.id,
                  },
                },
              })
          );
        }
        files.forEach(
          async (file) =>
            await prisma.createFile({
              url: file,
              post: {
                connect: {
                  id: post.id,
                },
              },
            })
        );

        return post;
      } catch (error) {
        console.log("fail:", making_hashtag);
        making_hashtag.forEach(async (hashtag) => {
          if (hashtag.includes("#")) {
            console.log(hashtag);
          }
        });
      }
    },
  },
};
