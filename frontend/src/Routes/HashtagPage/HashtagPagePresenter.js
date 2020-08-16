import React from "react";
import styled from "styled-components";
import FatText from "../../Components/FatText";
import Loader from "../../Components/Loader";
import Input from "../../Components/Input";
import useInput from "../../Hooks/useInput";
import { withRouter,Link } from "react-router-dom";
import InfiniteScroll from 'react-infinite-scroll-component';
import SquarePost from "../../Components/SquarePost";

const Posts = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 200px);
  grid-template-rows: 200px;
  grid-auto-rows: 200px;
  @media only screen and (max-width: ${(props) => props.theme.sm}) {
    grid-template-columns: repeat(3, 32vw);
    grid-template-rows: 32vw;
    grid-auto-rows: 32vw;
    justify-content:space-around;
  }
`;

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
  margin: 10px auto;
  display: block;
`;
const Section = styled.div`
  margin-bottom: 50px;
  grid-gap: 25px;
  grid-template-columns: repeat(4, 160px);
  grid-template-rows: 160px;
  grid-auto-rows: 160px;
`;

const ELink = styled(Link)`
  color: inherit;
  margin-bottom: 10px;
`;
export default withRouter(({ searchTerm, loading, data, history, fetchMore,hasMore,setHasMore }) => {
  const onLoadMore = () => {

    fetchMore({
      variables: {
        cur: data.HashtagPost.length,
        limit:8,
        term: searchTerm
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if(fetchMoreResult.HashtagPost.length<8)
        {
          setHasMore(false);
        }
        if (!fetchMoreResult){ 
          return prev;}
        return Object.assign({}, prev, {
          HashtagPost: [...prev.HashtagPost, ...fetchMoreResult.HashtagPost]
        });
      }
    })

  };
  if (loading === true) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  } else if (data && data.HashtagPost) {
    return (
      <Wrapper>
        <FatText text={`${searchTerm}`} />

        <Section>
          {data.HashtagPost.length === 0 ? (
            <FatText text="챌린지를 찾을 수 없습니다." />
          ) : (
            <InfiniteScroll
            dataLength={data.HashtagPost.length}
            next={onLoadMore}
            hasMore={hasMore}
            loader={<Wrapper>
              <Loader />
            </Wrapper>}
          >{
            data.HashtagPost.map((posts,idx) => (
              <Posts>
              {posts &&
                posts.map((post) => {
                  console.log(post.prePostCount);
                  return(
                  <SquarePost
                    key={post.id}
                    id={post.id}
                    likeCount={post.likeCount}
                    commentCount={post.comments.length}
                    file={post.files[0]}
                    post={post}
                  />
                )})}
            </Posts>
            ))}
            </InfiniteScroll>
          )}
        </Section>
      </Wrapper>
    );
  }
});

