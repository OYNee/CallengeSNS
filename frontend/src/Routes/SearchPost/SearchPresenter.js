import React from "react";
import styled from "styled-components";
import FatText from "../../Components/FatText";
import Loader from "../../Components/Loader";
import UserCard from "../../Components/UserCard";
import SquarePost from "../../Components/SquarePost";
import Input from "../../Components/Input";
import useInput from "../../Hooks/useInput";
import { withRouter,Link } from "react-router-dom";
import InfiniteScroll from 'react-infinite-scroll-component';
const Wrapper = styled.div`
  height: 50vh;
`;
const SearchInput = styled(Input)`
  background-color: ${(props) => props.theme.bgColor};
  padding: 5px;
  font-size: 14px;
  border-radius: 3px;
  height: auto;
  text-align: center;
  width: 70%;
  &::placeholder {
    opacity: 0.8;
    font-weight: 200;
  }
`;
const Section = styled.div`
  margin-bottom: 50px;
  display: grid;
  grid-gap: 25px;
  grid-template-columns: repeat(4, 160px);
  grid-template-rows: 160px;
  grid-auto-rows: 160px;
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
  const search = useInput("");
  var types = 1;
  const onSearchSubmit = (e) => {
    e.preventDefault();
    history.push(`/search?term=${search.value}`);
  };
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
  } else if (data && data.searchUser && data.searchPost && types ===2) {
    return (
      <Wrapper>
        <form onSubmit={onSearchSubmit}>
          <SearchInput
            value={search.value}
            onChange={search.onChange}
            placeholder="Search..."
          />
        </form>
        <Section>
        {data.searchUser.length === 0 ?(
          <FatText text="사용자--------------------"/>
        ):(
          <ELink to={`/search-user?term=${search.value}`}>
          <FatText text="사용자--------------------"/>
         </ELink>
        )}
        </Section>
        <Section>
          {data.searchUser.length === 0 ? (
            <FatText text="No Users Found" />
          ) : (
            <InfiniteScroll
            dataLength={data.searchUser.length}
            next={onLoadMore}
            hasMore={data.searchUser.length%8 === 0?true:false}
            loader={<Wrapper>
              <Loader />
            </Wrapper>}
          >{
            data.searchUser.map(user => (
              <UserCard
                key={user.id}
                username={user.username}
                isFollowing={user.isFollowing}
                url={user.avatar}
                isSelf={user.isSelf}
                id={user.id}
              />
            ))}
            </InfiniteScroll>
          )}
        </Section>
        <Section>
        {data.searchPost.length === 0 ?(
          <FatText text="챌린지--------------------"/>
        ):(
          <ELink to={`/home`}>
          <FatText text="챌린지--------------------"/>
         </ELink>
        )}
        </Section>
        <PostSection>
          {data.searchPost.length === 0 ? (
            <FatText text="No Posts Found" />
          ) : (
            data.searchPost.map(post => (
              console.log(`${post.id}`),
              <SquarePost
                key={post.id}
                likeCount={post.likeCount}
                commentCount={post.commentCount}
                file={post.files[0]}
              />
            ))
          )}
        </PostSection>
      </Wrapper>
    );
  }else if (data && data.searchUser && data.searchPost && types ===1) {
    return (
      <Wrapper>
        <form onSubmit={onSearchSubmit}>
          <SearchInput
            value={search.value}
            onChange={search.onChange}
            placeholder="Search..."
          />
        </form>
        <Section>
        {data.searchUser.length === 0 ?(
          <FatText text="사용자--------------------"/>
        ):(
          <ELink to={`/search-user?term=${search.value}`}>
          <FatText text="사용자--------------------"/>
         </ELink>
        )}
        </Section>
        <Section>
          {data.searchUser.length === 0 ? (
            <FatText text="No Users Found" />
          ) : (
            data.searchUser.map(user => (
              <UserCard
                key={user.id}
                username={user.username}
                isFollowing={user.isFollowing}
                url={user.avatar}
                isSelf={user.isSelf}
                id={user.id}
              />
            ))
          )}
        </Section>
        <Section>
        {data.searchPost.length === 0 ?(
          <FatText text="챌린지--------------------"/>
        ):(
          <ELink to={`/home`}>
          <FatText text="챌린지--------------------"/>
         </ELink>
        )}
        </Section>
        <PostSection>
          {data.searchPost.length === 0 ? (
            <FatText text="No Posts Found" />
          ) : (
            data.searchPost.map(post => (
              console.log(`${post.id}`),
              <SquarePost
                key={post.id}
                likeCount={post.likeCount}
                commentCount={post.commentCount}
                file={post.files[0]}
              />
            ))
          )}
        </PostSection>
      </Wrapper>
    );
  }else if (data && data.searchUser && data.searchPost && types ===3) {
    return (
      <Wrapper>
        <form onSubmit={onSearchSubmit}>
          <SearchInput
            value={search.value}
            onChange={search.onChange}
            placeholder="Search..."
          />
        </form>
        <Section>
        {data.searchUser.length === 0 ?(
          <FatText text="사용자--------------------"/>
        ):(
          <ELink to={`/home`}>
          <FatText text="사용자--------------------"/>
         </ELink>
        )}
        </Section>
        <Section>
          {data.searchUser.length === 0 ? (
            <FatText text="No Users Found" />
          ) : (
            <InfiniteScroll
            dataLength={data.searchUser.length}
            next={onLoadMore}
            hasMore={data.searchUser.length%8 === 0?true:false}
            loader={<Wrapper>
              <Loader />
            </Wrapper>}
          >{
            data.searchUser.map(user => (
              <UserCard
                key={user.id}
                username={user.username}
                isFollowing={user.isFollowing}
                url={user.avatar}
                isSelf={user.isSelf}
                id={user.id}
              />
            ))}
            </InfiniteScroll>
          )}
        </Section>
        <Section>
        {data.searchPost.length === 0 ?(
          <FatText text="챌린지--------------------"/>
        ):(
          <ELink to={`/home`}>
          <FatText text="챌린지--------------------"/>
         </ELink>
        )}
        </Section>
        <PostSection>
          {data.searchPost.length === 0 ? (
            <FatText text="No Posts Found" />
          ) : (
            data.searchPost.map(post => (
              console.log(`${post.id}`),
              <SquarePost
                key={post.id}
                likeCount={post.likeCount}
                commentCount={post.commentCount}
                file={post.files[0]}
              />
            ))
          )}
        </PostSection>
      </Wrapper>
    );
  }
});
