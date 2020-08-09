import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
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

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 80%;
  margin: 15px auto;
  @media only screen and (max-width:${(props) => props.theme.sm}) {
    width: 100%;
    height: 100px;
  }
`;

const HeaderColumn = styled.div`
  width:50%;
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

const FullName = styled(FatText)`
  font-size: 16px;
`;

const Bio = styled(FatText)`
font-size: 16px;
`;

const Posts = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 200px);
  grid-template-rows: 200px;
  grid-auto-rows: 200px;
  @media only screen and (max-width:${(props) => props.theme.sm}) {
    grid-template-columns: repeat(3, 32vw);
    grid-template-rows: 32vw;
    justify-content:space-around;
  }
`;

const ELink = styled(Link)`
  color: inherit;
  margin-bottom: 10px;
  &:hover {
    color: ${(props) => props.theme.livingCoral}
  }
`;


export default ({ loading, data, logOut }) => {
  if (loading === true) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  } else if (!loading && data && data.seeUser) {
    const {
      seeUser: {
        id,
        avatar,
        username,
        fullName,
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
                  <DropdownMenu username={username}/>
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
              
        </Header>
        {fullName ? (
          <FullName text={fullName}/>
          ) : (
          <FullName text="fullName 없음"/>
          )}
        {bio ? (
          <Bio><div>자기소개 있음</div></Bio>
          ) : (
            <div>자기소개 없음</div>
          )}
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
