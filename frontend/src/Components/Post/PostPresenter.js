import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Modal } from "semantic-ui-react";
import TextareaAutosize from "react-autosize-textarea";
import FatText from "../FatText";
import Avatar from "../Avatar";
import { HeartFull, HeartEmpty, Comment as CommentIcon, Logo } from "../Icons";
import CreatePost from "../../Routes/CreatePost"

const LikeText = styled(FatText)`
  color:${(props) => props.theme.livingCoral}
`

const Post = styled.div`
  ${props => props.theme.whiteBox};
  width: 100%;
  user-select: none;
  margin:3px 0;
  a {
    color: inherit;
  }
`;

const Header = styled.header`
  padding: 10px 15px;
  display: flex;
  align-items: center;
`;

const UserColumn = styled.div`
  margin-left: 10px;
`;

const Location = styled.span`
  display: block;
  margin-top: 5px;
  font-size: 12px;
`;

const Files = styled.div`
  position: relative;
  padding-bottom: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex-shrink: 0;
`;

const ImageFile = styled.div`
  max-width: 100%;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  opacity: ${props => (props.showing ? 1 : 0)};
  transition: opacity 0.5s linear;
`;
const VideoFile = styled.iframe`
  max-width: 100%;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
`;

const AudioFile = styled.div`
  max-width: 100%;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  opacity: ${props => (props.showing ? 1 : 0)};
  transition: opacity 0.5s linear;
`;

const TextFile = styled.div`
  max-width: 100%;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  opacity: ${props => (props.showing ? 1 : 0)};
  transition: opacity 0.5s linear;
`;

const Button = styled.span`
  cursor: pointer;
`;

const Meta = styled.div`
  padding: 15px;
`;

const Buttons = styled.div`
  ${Button} {
    &:first-child {
      margin-right: 10px;
    }
  }
  margin-bottom: 10px;
`;

const Timestamp = styled.span`
  font-weight: 400;
  text-transform: uppercase;
  opacity: 0.5;
  display: block;
  font-size: 12px;
  margin: 10px 0px;
  padding-bottom: 10px;
  border-bottom: ${props => props.theme.livingCoral} 1px solid;
`;

const Textarea = styled(TextareaAutosize)`
  border: none;
  width: 100%;
  resize: none;
  font-size: 14px;
  &:focus {
    outline: none;
  }
`;

const Comments = styled.ul`
  margin-top: 10px;
`;

const Comment = styled.li`
  margin-bottom: 7px;
  span {
    margin-right: 5px;
  }
`;

const Caption = styled.div`
  margin: 10px 0px;
`;



const CreateButton = styled.button`
width:10px;
height:10px;
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


const CreateModal = ({category, pid, hashtags }) => {
  const [state, dispatch] = React.useReducer(exampleReducer, {
    open: false,
    size: undefined,
  });
  const { open, size } = state;

  return (
    <>
      <Logo onClick={() => dispatch({ type: "open", size: "tiny" })}></Logo>
      <Modal
        size={size}
        open={open}
        onClose={() => dispatch({ type: "close" })}
      >
        <Modal.Content>
          <CreatePost
            category = {category}
            pid={pid}
            hashtags={hashtags}
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





export default ({
  user: { username, avatar},
  location,
  files,
  isLiked,
  likeCount,
  createdAt,
  newComment,
  currentItem,
  toggleLike,
  onKeyPress,
  comments,
  selfComments,
  caption,
  Cuser,
  category,
  id,
  hashtags,
  
}) => {
  return(
  <Post>
    <Header>
      <Avatar size="sm" url={avatar} />
      <UserColumn>
        <Link to={`/${username}`}>
          <FatText text={username} />
        </Link>
        <Location>{location}</Location>
      </UserColumn>
    </Header>
    {category === "image" && 
    (
    <Files>
      {files && files.map((file, index) => {
        if (file.url) {
          return (<ImageFile key={file.id} src={file.url} showing={index === currentItem} />)
        } else {
            return (<ImageFile key={file.id} src={"https://cdn.pixabay.com/photo/2012/04/16/12/53/ghost-35852_960_720.png"} showing={index === currentItem} />)
          }})}
    </Files>
    )}
    {category === "video" && 
    (
      <Files>
      {files && files.map((file, index) => {
        if (file.url) {
          return (<VideoFile key={file.id} src={file.url} showing={index === currentItem} />)
        } else {
            return (<VideoFile key={file.id} src={"https://cdn.pixabay.com/photo/2012/04/16/12/53/ghost-35852_960_720.png"} showing={index === currentItem} />)
          }})}
    </Files>
    )}
    {category === "audio" && 
    (
      <Files>
      {files && files.map((file, index) => {
        if (file.url) {
          return (<AudioFile key={file.id} src={file.url} showing={index === currentItem} />)
        } else {
            return (<AudioFile key={file.id} src={"https://cdn.pixabay.com/photo/2012/04/16/12/53/ghost-35852_960_720.png"} showing={index === currentItem} />)
          }})}
    </Files>
    )}
    {category === "text" && 
    (
      <Files>
      {files && files.map((file, index) => {
        if (file.url) {
          return (<TextFile key={file.id} src={file.url} showing={index === currentItem} />)
        } else {
            return (<TextFile key={file.id} src={"https://cdn.pixabay.com/photo/2012/04/16/12/53/ghost-35852_960_720.png"} showing={index === currentItem} />)
          }})}
    </Files>
    )}
    <Meta>
      <Buttons>
        <Button onClick={toggleLike}>
          {isLiked ? <HeartFull /> : <HeartEmpty />}
        </Button>
        <Button>
          <CommentIcon />
        </Button>
        <Button>
          <CreateModal category={category} pid={id} hashtags={hashtags}/>

        </Button>
      </Buttons>
      {isLiked ? <LikeText text={likeCount === 1 ? "1 like" : `${likeCount} likes`} /> : <FatText text={likeCount === 1 ? "1 like" : `${likeCount} likes`} />}

      
      <Caption>
       {Cuser}
        <FatText text={username} /> {caption}
      </Caption>
      {comments && (
        <Comments>
          {comments.map(comment => (
            <Comment key={comment.id}>
              <FatText text={comment.user.username} />
              {comment.text}
            </Comment>
          ))}
          {selfComments.map(comment => (
            <Comment key={comment.id}>
              <FatText text={comment.user.username} />
              {comment.text}
            </Comment>
          ))}
        </Comments>
      )}
      <Timestamp>{createdAt}</Timestamp>
      <Textarea
        onKeyPress={onKeyPress}
        placeholder={"Add a comment..."}
        value={newComment.value}
        onChange={newComment.onChange}
      />
    </Meta>
  </Post>
)};
