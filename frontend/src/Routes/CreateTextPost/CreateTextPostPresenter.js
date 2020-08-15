import React, { useState } from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Input from "../../Components/Input";
import TextInput from "../../Components/TextInput";
import Btn from "../../Components/Button";
import { Dropdown } from "semantic-ui-react";
import Loader from "../../Components/Loader";
import { PhotoshopPicker } from "react-color";
import { Button, Popup } from "semantic-ui-react";

const Wrapper = styled.div`
  padding: 3vw;
  margin: 0 4vw;
  @media only screen and (max-width: ${(props) => props.theme.sm});
`;
const Section = styled.div`
  width: 100%;
  margin: 15px auto;
`;

const PostBox = styled.div`
  width: 86vw;
  background-color: rgba(0, 0, 0, 0);
  margin: 3vw auto;
  border-radius: 10px;
`;

const ContentBox = styled.div`
  width: 86vw;
  height: 86vw;
`;

const CaptionInput = styled.textarea`
  border: 0;
  border: ${(props) => props.theme.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius};
  width:86vw;
  height 20vh;
  font-size: 12px;
  padding: 0px 15px;
  resize: none;
`;

const CompleteButton = styled.button`
  height: 10vh;
`;

export default ({
  action,
  id,
  setAction,
  setCreate,
  create,
  textContent,
  onSubmit,
  relChallenger,
  tagChallenger,
  loading,
  caption,
  data,
  setRelChallenger,
  setTagChallenger,
  color,
  setColor,
  fcolor,
  setFColor,
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
    console.log(e);
    onSubmit(e);
  };
  // const [color, setColor] = useState("#ffffff");
  // const [fcolor, setFColor] = useState("#000000");

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
          {action === "CreatePost" && (
            <>
              <ContentBox>
                <div
                  style={{
                    backgroundColor: color,
                    height: "100%",
                    transition: "ease all 500ms",
                  }}
                >
                  {/* <textarea
                    style={
                      ({ color: fcolor },
                      { backgroundColor: "transparent" },
                      { fontSize: "30px" })
                    }
                    required
                  ></textarea> */}
                  <TextInput
                    placeholder="Text Challenge"
                    {...textContent}
                    style={{ color: fcolor }}
                  ></TextInput>
                </div>
              </ContentBox>
              <div>
                <Popup
                  content={
                    <PhotoshopPicker
                      color={color}
                      onChangeComplete={(color) => {
                        setColor(color.hex);
                      }}
                    />
                  }
                  on="click"
                  pinned
                  trigger={<Button content="배경색 고르기" />}
                />
              </div>
              <div>
                <Popup
                  content={
                    <PhotoshopPicker
                      color={fcolor}
                      onChangeComplete={(color) => {
                        setFColor(color.hex);
                      }}
                    />
                  }
                  on="click"
                  pinned
                  trigger={<Button content="글자색 고르기" />}
                />
              </div>
              <h1>한마디 부탁해요!</h1>
              <CaptionInput placeholder="한마디 부탁해요!" {...caption} />
              <h1>누구와 함께?</h1>
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
              <Btn onClick={onUpload} text="업로드" />
            </>
          )}
        </PostBox>
      </Wrapper>
    );
  } else {
    return <Wrapper>하위</Wrapper>;
  }
};
