import React, { useState } from "react";
import styled from "styled-components";
import { Modal } from "semantic-ui-react";
import PropTypes from "prop-types";
import { HeartFull, CommentFull } from "./Icons";
import { Link } from "react-router-dom";
import Post from "./Post";

const Overlay = styled.div`
  @media only screen and (min-width:${(props) => props.theme.sm}) {
    background-color: rgba(0, 0, 0, 0.6);
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: opacity 0.3s linear;
    svg {
      fill: white;
    }
  }
`;

const Container = styled.div`
  background-image: url(${props => props.bg});
  background-size: cover;
  cursor: default;
  width:100%
  height:100%
  @media only screen and (min-width:${(props) => props.theme.sm}) {
    &:hover {
      ${Overlay} {
        opacity: 1;
      }
    }
  }
`;

const Number = styled.div`
  color: white;
  display: flex;
  align-items: center;
  &:first-child {
    margin-right: 30px;
  }
  @media only screen and (max-width:${(props) => props.theme.sm}) {
    display:none;
  }
`;

const NumberText = styled.span`
  margin-left: 10px;
  font-size: 16px;
  @media only screen and (max-width:${(props) => props.theme.sm}) {
    display:none;
  }
`;

const Button = styled.button`
  cursor: pointer;
  display: inline-block;
  border: none;
  vertical-align: baseline;
  color:white;
  background-color:${(props) => props.theme.livingCoral};
  padding: .78571429em 1.5em .78571429em;
  text-transform: none;
  text-shadow: none;
  font-weight: 700;
  line-height: 1em;
  text-align: center;
  text-decoration: none;
  border-radius: .28571429rem;
  box-shadow: 0 0 0 1px transparent inset, 0 0 0 0 rgba(34,36,38,.15) inset;
  -webkit-tap-highlight-color: transparent;
  margin-left: .75em;
  margin-bottom: 15px
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


const PostModal = ({post, file}) => {
  const [state, dispatch] = React.useReducer(exampleReducer, {
    open: false,
    size: undefined,
  });
  const { open, size } = state;

  return (
    <>
      <ListItem onClick={() => dispatch({ type: "open", size: "tiny" })}></ListItem>
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
            prePostCount={post.prePostCount}
            nextPostCount={post.nextPostCount}
            nextPosts = {post.nextPosts}
            prePosts = {post.prePosts}
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


const SquarePost = ({ likeCount, commentCount, file, post }) => {
  // console.log(post)
  if (file.url) {
  return (
    <Container bg={file.url}>
      <ListItem as={PostModal} 
        post={post}
        file={file}/>
        <Overlay>
          <Number>
            <HeartFull />
            <NumberText>{likeCount}</NumberText>
          </Number>
          <Number>
            <CommentFull />
            <NumberText>{commentCount}</NumberText>
          </Number>
        </Overlay>
    </Container>
  )}
  else {
    return (
      <Container bg={"https://cdn.pixabay.com/photo/2012/04/16/12/53/ghost-35852_960_720.png"}>
        <ListItem as={PostModal} 
          post={post}
          file={file}
        />
        <Overlay>
          <Number>
            <HeartFull />
            <NumberText>{likeCount}</NumberText>
          </Number>
          <Number>
            <CommentFull />
            <NumberText>{commentCount}</NumberText>
          </Number>
        </Overlay>
      </Container>
    );};
}

SquarePost.propTypes = {
  likeCount: PropTypes.number.isRequired,
  commentCount: PropTypes.number.isRequired,
  file: PropTypes.object.isRequired
};

export default SquarePost;
