import React from "react";
import styled from "styled-components";
import FatText from "../../Components/FatText";
import Loader from "../../Components/Loader";
import UserCard from "../../Components/UserCard";
import HashtagCard from "../../Components/HashtagCard";
import SquarePost from "../../Components/SquarePost";
import Input from "../../Components/Input";
import useInput from "../../Hooks/useInput";
import { withRouter,Link } from "react-router-dom";
import InfiniteScroll from 'react-infinite-scroll-component';
import { encode } from "utf8";

const SearchUserCard = styled(UserCard)`
`

const SearchMore = styled(FatText)`
  color:${(props) => props.theme.livingCoral}
`


const Wrapper = styled.div`
  @media only screen and (max-width:${(props) => props.theme.sm}) {
  };
`;
const SearchInput = styled(Input)`
  background-color: ${(props) => props.theme.bgColor};
  padding: 5px;
  font-size: 14px;
  border-radius: 15px;
  height: 30px;
  text-align: center;
  width: 70%;
  margin: 10px auto;
  display: block;
  &::placeholder {
    opacity: 0.8;
    font-weight: 200;
  }
`;
const Section = styled.div`
  margin-bottom: 50px;

  @media only screen and (max-width:${(props) => props.theme.sm}) {

  };
`;

const PostSection = styled(Section)`
  grid-template-columns: repeat(4, 200px);
  grid-template-rows: 200px;
  grid-auto-rows: 200px;
`;
const ELink = styled(Link)`
  color: inherit;
  margin-bottom: 10px;
`;
export default withRouter(({ searchTerm, loading, data, history}) => {


  const search =(searchTerm?useInput(searchTerm):useInput(""));
  const onSearchSubmit = (e) => {
    e.preventDefault();
    history.push(`/search?term=`+encodeURIComponent(search.value));
  };
  console.log(data)
  if (searchTerm === undefined) {
    return (
      <Wrapper>
        <form onSubmit={onSearchSubmit}>
      <SearchInput
        value={search.value}
        onChange={search.onChange}
        placeholder="Search..."
      />
      </form>
      </Wrapper>
    );
  } else if (loading === true) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  } else if (data && data.searchUser && data.searchHashtag) {
    return (
      <Wrapper>
        <form onSubmit={onSearchSubmit}>
          <SearchInput
            value={search.value}
            onChange={search.onChange}
            placeholder="Search..."
          />
        </form>
        <div>
          {data.searchUser.length === 0 ?
            (<></>):
            ( <ELink to={`/search-user?term=${searchTerm}`}>
              <SearchMore text="더 많은 챌린저 보러 가기!"/>
              </ELink>
            )
          }
        </div>
        <Section>
          {data.searchUser.length === 0 ? (
            <FatText text="찾으시는 챌린저가 없습니다 ㅠ" />
          ) : (
            data.searchUser.map((user,idx) => (
              <SearchUserCard
                key={idx}
                username={user.username}
                isFollowing={user.isFollowing}
                url={user.avatar}
                isSelf={user.isSelf}
                id={user.id}
                bio={user.bio}
              />
            ))
          )}
        </Section>
        <div>
        {data.searchHashtag.length === 0 ?(<></>
        ):(
          <ELink to={`/search-challenge?term=${searchTerm}`}>
          <SearchMore text="다른 챌린지 보러 가기!"/>
         </ELink>
        )}
        </div>
        <PostSection>
          {data.searchHashtag.length === 0 ? (
            <FatText text="조건에 맞는 챌린지가 없네요 ㅠㅠ" />
          ) : (
            data.searchHashtag.map((hashtag,idx) => (
              <HashtagCard
              key={idx}
              username={hashtag.tag_name}
              postCount={hashtag.postCount}
              posts={hashtag.posts.slice(0,3)}
            />
            ))
          )}
        </PostSection>
      </Wrapper>
    );
  }
});

