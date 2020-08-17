import React, { useState } from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import TextInput from "../../Components/TextInput";
import Btn from "../../Components/Button";
import { Dropdown } from "semantic-ui-react";
import Loader from "../../Components/Loader";
import {
  MaskedTextBox,
  NumericTextBox,
  Input,
  Switch,
  Slider,
  RangeSlider,
  SliderLabel,
  ColorGradient,
  ColorPalette,
  ColorPicker,
  Checkbox,
  RadioButton,
  RadioGroup,
} from "@progress/kendo-react-inputs";
import "@progress/kendo-react-intl";
import "@progress/kendo-drawing";
import "@progress/kendo-react-tooltip";
import "@progress/kendo-react-form";
import "@progress/kendo-react-dropdowns";
import "@progress/kendo-react-buttons";
import "@progress/kendo-react-labels";

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
    console.log(e);
    onSubmit(e);
  };
  const colorPick = (e) => {
    console.log(color);
    onSubmit(e);
  };
  const gradientSettings = {
    opacity: false,
  };

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
                <ColorPicker
                  defaultValue={color}
                  view={"gradient"}
                  onChange={(color) => {
                    setColor(color.value);
                  }}
                />
              </div>
              <div>
                <ColorPicker
                  defaultValue={fcolor}
                  view={"gradient"}
                  icon={"edit-tools"}
                  gradientSettings={gradientSettings}
                  onChange={(fcolor) => {
                    setFColor(fcolor.value);
                  }}
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
