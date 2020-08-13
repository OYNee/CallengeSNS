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
import ImageInput from "../../Components/ProfileInput";

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
  margin: 15px auto;
  @media only screen and (max-width: ${(props) => props.theme.sm}) {
    width: 100%;
    height: 100px;
  }
`;

const HeaderColumn = styled.div`
  width: 50%;
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
  margin: 15px 0px;
`;

const Count = styled.li`
  font-size: 15px;
  margin: 5px
  &:not(:last-child) {
    margin-right: 10px;
  }
`;

const AvatarColumn = styled.div`
  margin: auto
  width:100px
`;

const NickName = styled(FatText)`
  font-size: 16px;
  display: block;
  margin-bottom: 5px;
  margin-left: 10vw;
`;

const Bio = styled.p`
  font-size: 12px;
  display: block;
  margin-left: 5vw;
  margin: 10px 0px;
`;

const Posts = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 200px);
  grid-template-rows: 200px;
  grid-auto-rows: 200px;
  @media only screen and (max-width: ${(props) => props.theme.sm}) {
    grid-template-columns: repeat(3, 32vw);
    grid-template-rows: 32vw;
    justify-content: space-around;
  }
`;
const ELink = styled(Link)`
  color: inherit;
  margin-bottom: 10px;
  &:hover {
    color: ${(props) => props.theme.livingCoral};
  }
`;

const ProfilUpdateBox = styled.div`
  text-align: center;
  padding: 10px;
  font-size: 20px;
  border: 1px solid rgba(0,0,0,0.1);
  margin: 10px 1vw;
  border-radius: 90px;
  background-color:rgba(255,101,97,0.66);
  color:white;
  &:hover {
    background-color:rgba(255,101,97);
    opacity: 0.88;
    filter: alpha(opacity=88);
    color:white;
    zoom: 1;

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
            {/* <Avatar size="lg" url={avatar}> */}
            <ImageInput></ImageInput>
            {/* </Avatar> */}
            <Input placeholder={nickname} {...newNickname} />
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
            <AvatarColumn>
              <Avatar size="lg" url={avatar} />
            </AvatarColumn>
          </HeaderColumn>
          <HeaderColumn>
            <UsernameRow>
              {isSelf ? (
                <DropdownMenu username={username} />
              ) : (
                <>
                  <Username>{username}</Username>
                  <FollowButton isFollowing={isFollowing} id={id} />
                </>
              )}
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
          </HeaderColumn>
          {}
        </Header>
        {nickname ? (
          <NickName text={nickname} />
        ) : (
          <NickName text="nickname 없음" />
        )}
        {bio ? <Bio>{bio}</Bio> : <Bio>자기소개 없음</Bio>}
        <ProfilUpdateBox onClick={() => setAction("update")}>
          프로필 수정
        </ProfilUpdateBox>

        <Posts>
          {posts &&
            posts.map((post) => (
              <SquarePost
                key={post.id}
                id={post.id}
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
