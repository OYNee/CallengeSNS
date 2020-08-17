import React from "react";
import styled from "styled-components";
import Loader from "../../Components/Loader";
import Post from "../../Components/Post";
import InfiniteScroll from 'react-infinite-scroll-component';
import { withRouter,Link } from "react-router-dom";
import FatText from "../../Components/FatText";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 80vh;
  @media only screen and (max-width: ${(props) => props.theme.sm}) {
    min-height: 100vh;
  }
`;

const EFatText = styled(FatText)`
line-height:600px;
`;
export default withRouter(({ loading, data, history, fetchMore,hasMore,setHasMore }) => {
  console.log(data)
  const onLoadMore = () => {

    fetchMore({
      variables: {
        cur: data.seeFeed.length,
        limit:5
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if(fetchMoreResult.seeFeed.length<5)
        {
          setHasMore(false);
        }
        if (!fetchMoreResult){ 
          return prev;}
        return Object.assign({}, prev, {
          seeFeed: [...prev.seeFeed, ...fetchMoreResult.seeFeed]
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
  } else if (data && data.seeFeed) {
    return (
      <Wrapper>
          {data.seeFeed.length === 0 ? (
            <EFatText text="현재 존재하는 챌린지가 없습니다." />
          ) : (
            <InfiniteScroll
            dataLength={data.seeFeed.length}
            next={onLoadMore}
            hasMore={hasMore}
            loader={<Wrapper>
              <Loader />
            </Wrapper>}
          >{
        data.seeFeed.map((post) => {
          return(
          <Post
            key={post.id}
            id={post.id}
            location={post.location}
            caption={post.caption}
            user={post.user}
            files={post.files}
            likeCount={post.likeCount}
            isLiked={post.isLiked}
            comments={post.comments}
            createdAt={post.createdAt}
            category={post.category}
            hashtags={post.hashtags}
            prePostCount={post.prePostCount}
            nextPostCount={post.nextPostCount}
            nextPosts = {post.nextPosts}
            prePosts = {post.prePosts}
            textContent = {post.textContent}
          />
        )})}
        </InfiniteScroll>
          )}
      </Wrapper>
    );
  }
});
