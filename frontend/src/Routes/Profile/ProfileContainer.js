import React, { useState } from "react";
import { gql } from "apollo-boost";
import withRouter from "react-router-dom/withRouter";
import { useQuery, useMutation } from "react-apollo-hooks";
import ProfilePresenter from "./ProfilePresenter";
import useInput from "../../Hooks/useInput";
import { toast } from "react-toastify";

const GET_USER = gql`
  query seeUser($username: String!) {
    seeUser(username: $username) {
      id
      avatar
      username
      nickname
      fullName
      isFollowing
      isSelf
      bio
      followingCount
      followersCount
      postsCount
      posts {
        id
        files {
          url
        }
        likeCount
        commentCount
      }
    }
  }
`;

export const UPDATE_PROFILE = gql`
  mutation editUser($nickname: String, $bio: String, $avatar: String) {
    editUser(nickname: $nickname, bio: $bio, avatar: $avatar)
  }
`;

export default withRouter(
  ({
    match: {
      params: { username },
    },
  }) => {
    const { data, loading } = useQuery(GET_USER, { variables: { username } });
    const [action, setAction] = useState("profile");
    const newNickname = useInput("");
    const newBio = useInput("");
    const avatar = useInput("");
    const update = useMutation(UPDATE_PROFILE, {
      variables: {
        nickname: newNickname.value,
        bio: newBio.value,
      },
    });
    const onSubmit = async (e) => {
      e.preventDefault();
      if (action === "update") {
        try {
          const {
            data: { editUser },
          } = await update();
          if (!editUser) {
            toast.error("Fail...");
          } else {
            // 리로드 없이 갱신방법 알아보기
            window.location.reload();
            setTimeout(() => setAction("profile"), 3000);
          }
        } catch {
          toast.error("Fail");
        }
      }
    };
    return (
      <ProfilePresenter
        loading={loading}
        data={data}
        setAction={setAction}
        action={action}
        newNickname={newNickname}
        newBio={newBio}
        avatar={avatar}
        onSubmit={onSubmit}
      />
    );
  }
);
