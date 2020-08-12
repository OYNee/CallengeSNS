import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import Input from "../../Components/NotRequiredInput";
import Loader from "../../Components/Loader";
import Avatar from "../../Components/Avatar";
import FatText from "../../Components/FatText";
import FollowButton from "../../Components/FollowButton";
import SquarePost from "../../Components/SquarePost";
import Button from "../../Components/Button";

import { Link } from "react-router-dom";
import DropdownMenu from "../../Components/UserSetting";

const Wrapper = styled.div`
  min-height: 100vh;
`;

const UpdateWrapper = styled.div`
  margin-top: -60px;
  margin-bottom: 20px;
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 80%;
  margin: 0 auto;
  margin-bottom: 40px;
`;

const HeaderColumn = styled.div`
  margin: 0 auto;
`;

const UsernameRow = styled.div`
  display: flex;
  align-items: center;
`;

const Username = styled.span`
  font-size: 26px;
  display: block;
`;

const Counts = styled.ul`
  display: flex;
  margin: 15px 0px;
`;

const Count = styled.li`
  font-size: 16px;
  &:not(:last-child) {
    margin-right: 10px;
  }
`;

const FullName = styled(FatText)`
  font-size: 16px;
`;

const Bio = styled.p`
  margin: 10px 0px;
`;

const Posts = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 200px);
  grid-template-rows: 200px;
  grid-auto-rows: 200px;
`;
const ELink = styled(Link)`
  color: inherit;
  margin-bottom: 10px;
`;

const Box = styled.div`
  ${(props) => props.theme.whiteBox}
  border-radius:0px;
  width: 100%;
  @media only screen and (max-width: ${(props) => props.theme.sm}) {
    max-width: 350px;
  }
  @media only screen and (min-width: ${(props) => props.theme.sm}) {
    max-width: 400px;
  }
  @media only screen and (min-width: ${(props) => props.theme.md}) {
    max-width: 450px;
  }
  @media only screen and (min-width: ${(props) => props.theme.lg}) {
    max-width: 500px;
  }
  @media only screen and (min-width: ${(props) => props.theme.xl}) {
    max-width: 600px;
  }
`;

const Form = styled(Box)`
  padding: 40px;
  padding-bottom: 30px;
  margin-bottom: 15px;
  form {
    width: 100%;
    input {
      width: 100%;
      &:not(:last-child) {
        margin-bottom: 7px;
      }
    }
    button {
      margin-top: 10px;
    }
  }
`;
export default ({
  loading,
  data,
  setAction,
  action,
  onSubmit,
  newBio,
  newNickname,
}) => {
  if (loading === true) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  } else if (action === "update" && data && data.seeUser) {
    const {
      seeUser: { avatar, nickname, bio },
    } = data;
    return (
      <UpdateWrapper>
        <Form>
          <Helmet>
            <title>Update Profile | ChallengeSNS</title>
          </Helmet>
          <form onSubmit={onSubmit}>
            <Avatar size="lg" url={avatar} />
            <Input val={nickname} {...newNickname} />
            <Input placeholder={bio} {...newBio} />
            <Button text={"SAVE"} />
          </form>
        </Form>
      </UpdateWrapper>
    );
  } else if (!loading && data && data.seeUser) {
    const {
      seeUser: {
        id,
        avatar,
        username,
        nickname,
        isFollowing,
        isSelf,
        bio,
        followingCount,
        followersCount,
        postsCount,
        posts,
      },
    } = data;
    return (
      <Wrapper>
        <Helmet>
          <title>{username} | ChallengeSNS</title>
        </Helmet>
        <Header>
          <HeaderColumn>
            <Avatar size="lg" url={avatar} />
          </HeaderColumn>
          <HeaderColumn>
            <UsernameRow>
              <Username>{username}</Username>{" "}
              {isSelf ? (
                <Button
                  onClick={() => setAction("update")}
                  text="프로필 수정"
                />
              ) : (
                <FollowButton isFollowing={isFollowing} id={id} />
              )}
              <HeaderColumn>
                <DropdownMenu />
              </HeaderColumn>
            </UsernameRow>
            <Counts>
              <Count>
                <FatText text={String(postsCount)} /> posts
              </Count>
              <Count>
                <ELink to={`/follower?${id}`}>
                  <FatText text={String(followersCount)} /> followers
                </ELink>
              </Count>
              <Count>
                <ELink to={`/following?${id}`}>
                  <FatText text={String(followingCount)} /> following
                </ELink>
              </Count>
            </Counts>
            <FullName text={nickname} />
            <Bio>{bio}</Bio>
          </HeaderColumn>
        </Header>
        <Posts>
          {posts &&
            posts.map((post) => (
              <SquarePost
                key={post.id}
                likeCount={post.likeCount}
                commentCount={post.commentCount}
                file={post.files[0]}
              />
            ))}
        </Posts>
      </Wrapper>
    );
  }
  return null;
};
