import React from "react";
import Bar from "./Bar";
// import useVideoPlayer from './useVideoPlayer';
import styled from "styled-components";
import { Modal } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Post from "../Post";

const VideoBox = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
`
const ControlBox = styled.div`
  width:100%;
  height:100%;
  
`

const Button = styled.button`
  width: 20vw;
  height: 20vw;
  border: 0;
  position: absolute;
  top: 30vw;
  left: 33vw;
`


function exampleReducer(state, action) {
  switch (action.type) {
    case "close":
      return { open: false };
    case "open":
      return { open: true, size: action.size };
    default:
      throw new Error("Unsupported action...");
  }
}

const ListItem = styled.div`
  width:200px;
  height:200px;
  position:absolute;
  @media only screen and (max-width:${(props) => props.theme.sm}){
    width:32vw;
    height:32vw;
  }
`
const BigBox = styled.div`
  position:relative
`

const PostModal = ({post, file}) => {
  const [state, dispatch] = React.useReducer(exampleReducer, {
    open: false,
    size: undefined,
  });
  const { open, size } = state;
  return (
    <>
      <VideoBox onClick={() => dispatch({ type: "open", size: "tiny" })}></VideoBox>
      <Modal
        size={size}
        open={open}
        onClose={() => dispatch({ type: "close" })}
      >
        <Modal.Content>
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
          />
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => dispatch({ type: "close" })}>
            Close
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};



const SquareVideo = ({videourl, post}) => {
  // const { curTime, duration, playing, setPlaying, setClickedTime } = useVideoPlayer();

  return (
    <BigBox>
    <video id="video" width="100%" height="100%" onClick={() => console.log(1)}>
        <source src={videourl} />
      </video>
    <VideoBox as={PostModal}
    post = {post}/>
      </BigBox>
  );
}

export default SquareVideo;
