import React from "react";
import styled from "styled-components";
import FatText from "../../Components/FatText";
import Loader from "../../Components/Loader";
import { withRouter} from "react-router-dom";
import Post from "../../Components/Post";

const Wrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
min-height: 80vh;
`;
const EFatText = styled(FatText)`
line-height:600px;
`;
export default withRouter(({loading, data}) => {

 
  if (loading === true) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  } else if (data && data.seeChallenge) {
    return (
      <Wrapper>
          {data.seeChallenge.length === 0 ? (
            <EFatText text="챌린지를 찾을 수 없습니다." />
          ) : (
            data.seeChallenge.map((post) => (
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
              />
            ))
          )}
      </Wrapper>
    );
  }
});

