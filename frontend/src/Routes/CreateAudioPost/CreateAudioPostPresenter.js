import React, { useState } from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Input from "../../Components/Input";
import AudioImageInput from "../../Components/AudioImageInput";
import AudioInput from "../../Components/AudioInput";
import Button from "../../Components/Button";
import { Dropdown } from "semantic-ui-react";
import Loader from "../../Components/Loader";
import { Modal } from "semantic-ui-react";
import {Frame} from "../../Components/Icons"
import Audio from "../../Components/Audio/Audio"

const Wrapper = styled.div`
  padding: 3vw;
  margin: 0 4vw;
  @media only screen and (max-width: ${(props) => props.theme.sm});
`;
const Section = styled.div`
  width: 100%;
  margin: 15px auto;
`;


const Blank = styled.div`
  width:100%;
  height:100%;
`

const Img = styled.img`
  width:86vw;
  height: 86vw;
`
const PostBox = styled.div`
  width: 86vw;
  background-color: rgba(0, 0, 0, 0);
  margin: 3vw auto;
  border-radius: 10px;
`;

const ContentBox = styled.div`
  width: 86vw;
  // height: 86vw;
`;

const CaptionInput = styled.textarea`
  border: 0;
  border: ${(props) => props.theme.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius};
  width:86vw;
  height 5vh;
  font-size: 12px;
  padding: 0px 15px;
  resize: none;
`;

const CompleteButton = styled.button`
  height: 10vh;
`;

const ListItem = styled.div`
  width:30px;
  height:30px;
  background-color:black;
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

const PostModal = ({videourl,imgurl}) => {
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
        <Audio
          videourl={videourl}
          imgurl={imgurl}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => dispatch({ type: "close" })}>
            모달끄기
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};





export default ({
  action,
  id,
  setAction,
  setCreate,
  create,
  caption,
  onSubmit,
  relChallenger,
  tagChallenger,
  loading,
  data,
  setRelChallenger,
  setTagChallenger,
}) => {
  const onSelectRelChallenger = (e, { value }) => {
    e.preventDefault();
    setRelChallenger(value);
  };
  const onSelectTagChallenger = (e, { value }) => {
    e.preventDefault();
    setTagChallenger(value);
  };
  const onRelChallenger = (e) => {
    setAction("CreatePost");
    onSubmit(e);
  };
  const onTagChallenger = (e) => {
    setAction("CreatePost");
    onSubmit(e);
  };
  const onUpload = (e) => {
    setCreate(true);
    onSubmit(e);
  };
  const [audio, setAudio] = useState({ preview: "", raw: "" });

const audioHandleChange = e => {
  if (e.target.files.length) {
    setAudio({
      preview: URL.createObjectURL(e.target.files[0]),
      raw: e.target.files[0]
    });
    console.log(URL.createObjectURL(e.target.files[0]))
    console.log(e.target.files)
  }
};

  const [image, setImage] = useState({ preview: "", raw: "" });
  
  const handleChange = e => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0]
      });
      console.log(URL.createObjectURL(e.target.files[0]))
      console.log(e.target.files)
    }
  }

  if (loading === true) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  } else if (data && data.followingUser) {
    const userOptions = data.followingUser.map((user, idx) => ({
      key: idx,
      value: user.id,
      text: `(@${user.username})`,
    }));

    return (
      <Wrapper>
        <PostBox>
          <ContentBox>
            {/* <AudioImageInput /> */}
            <label htmlFor="photo">
        {image.preview ? (
          <Img src={image.preview} alt={"dummy"}/>
        ) : (
          <Blank><Frame/></Blank>
        )}
      </label>
      <input
        type="file"
        id="photo"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleChange}
      />
            {/* <AudioInput/> */}
            <input type="file" id="video" accept="audio/*"
            onChange={audioHandleChange}/>
        {audio.preview && image.preview && (<ListItem as={PostModal}
                  videourl={audio.preview}
                  imgurl={image.preview} />)}
          </ContentBox>
          <h1>한마디 부탁해요!</h1>
          <CaptionInput placeholder="한마디 부탁해요!" {...caption} />

          <Section>
            <Dropdown
              placeholder="누구와 함께 했나요?"
              fluid
              multiple
              search
              selection
              defaultValue={tagChallenger}
              options={userOptions}
              onChange={onSelectTagChallenger}
            />
          </Section>
          <Section>
            <Dropdown
              placeholder="다음 챌린처를 지목해주세요!"
              fluid
              multiple
              search
              selection
              options={userOptions}
              defaultValue={relChallenger}
              onChange={onSelectRelChallenger}
            />
          </Section>
          <Button onClick={onUpload} text="업로드" />
        </PostBox>
      </Wrapper>
    );
  } else {
    return <Wrapper>하위</Wrapper>;
  }
};
