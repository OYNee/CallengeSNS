import React, { useState } from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Input from "../../Components/Input";
import ImageInput from "../../Components/ImageInput";
import Button from "../../Components/Button";
import { Dropdown } from "semantic-ui-react";
import Loader from "../../Components/Loader";



const Wrapper = styled.div`
  padding: 3vw;
  margin: 0 4vw;
  @media only screen and (max-width:${(props) => props.theme.sm})
`;
const Section = styled.div`
  width: 100%;
  margin: 15px auto;
`;

const PostBox = styled.div`
  width: 86vw;
  background-color: rgba(0,0,0,0);
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
  height 10vh;
  font-size: 12px;
  padding: 0px 15px;
  resize: none;
`;

const CompleteButton = styled.button`
  height:10vh;
`;



export default ({
  action,
  id,
  setAction,
  setCreate,
  create,
  audio,
  onSubmit,
  relChallenger,
  tagChallenger,
  loading,
  data,
  setRelChallenger,
  setTagChallenger,
  cat,
  pid
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
    console.log(e)
    onSubmit(e);
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
      text: `${user.nickname}(@${user.username})`,
    }));
    if (cat === "video") {
      return (
        <Wrapper>
          <PostBox>
          {action === "CreatePost" && (
            <>
            <ContentBox>
              <ImageInput></ImageInput>
            </ContentBox>
            <h1>"video"</h1>
            <CaptionInput
              placeholder="video"/>
            <h1>누구와 함께?</h1>
            <Section>
              <Dropdown
                placeholder="video"
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
                  placeholder="video"
                  fluid
                  multiple
                  search
                  selection
                  options={userOptions}
                  defaultValue={relChallenger}
                  onChange={onSelectRelChallenger}
                />
              </Section>
            <Button onClick={onUpload} text="업로드"/>
              
            </>)}
          {action !== "CreatePost" ? (<h1>하위</h1>) : (<h1>바위</h1>)}
          </PostBox>
        </Wrapper>
      );
    } else if (cat === "audio") {
      return (
        <Wrapper>
          <PostBox>
          {action === "CreatePost" && (
            <>
            <ContentBox>
              <ImageInput></ImageInput>
            </ContentBox>
            <h1>"audio"</h1>
            <CaptionInput
              placeholder="audio"/>
            <h1>누구와 함께?</h1>
            <Section>
              <Dropdown
                placeholder="audio"
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
                  placeholder="audio"
                  fluid
                  multiple
                  search
                  selection
                  options={userOptions}
                  defaultValue={relChallenger}
                  onChange={onSelectRelChallenger}
                />
              </Section>
            <Button onClick={onUpload} text="업로드"/>
              
            </>)}
          {action !== "CreatePost" ? (<h1>하위</h1>) : (<h1>바위</h1>)}
          </PostBox>
        </Wrapper>
      );

    } else if (cat === "text") {
      return (
        <Wrapper>
          <PostBox>
          {action === "CreatePost" && (
            <>
            <ContentBox>
              <ImageInput></ImageInput>
            </ContentBox>
            <h1>"text""text""text""text"</h1>
            <CaptionInput
              placeholder="text"/>
            <h1>누구와 함께?</h1>
            <Section>
              <Dropdown
                placeholder="text"
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
                  placeholder="text"
                  fluid
                  multiple
                  search
                  selection
                  options={userOptions}
                  defaultValue={relChallenger}
                  onChange={onSelectRelChallenger}
                />
              </Section>
            <Button onClick={onUpload} text="업로드"/>
              
            </>)}
          {action !== "CreatePost" ? (<h1>하위</h1>) : (<h1>바위</h1>)}
          </PostBox>
        </Wrapper>
      );

    } else {
      return (
        <Wrapper>
          <PostBox>
          {action === "CreatePost" && (
            <>
            <ContentBox>
              <ImageInput></ImageInput>
            </ContentBox>
            <h1>"photo""photo""photo""photo""photo""photo"</h1>
            <CaptionInput
              placeholder="photo"/>
            <h1>누구와 함께?</h1>
            <Section>
              <Dropdown
                placeholder="photo"
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
                  placeholder="photo"
                  fluid
                  multiple
                  search
                  selection
                  options={userOptions}
                  defaultValue={relChallenger}
                  onChange={onSelectRelChallenger}
                />
              </Section>
            <Button onClick={onUpload} text="업로드"/>
              
            </>)}
          {action !== "CreatePost" ? (<h1>하위</h1>) : (<h1>바위</h1>)}
          </PostBox>
        </Wrapper>
      );

    }
  } else {
      return (
      <Wrapper>
        하위
      </Wrapper>
      )
    }
};










// return (
//   <Wrapper>
//     <button onCLick={() => setCategory("video")}>video</button>
//     <button onCLick={() => setCategory("audio")}>audio</button>
//     <button onCLick={() => setCategory("photo")}>photo</button>
//     <button onCLick={() => setCategory("text")}>text</button>
//     <PostBox>
//     {action === "CreatePost" && (
//       <>
//       <ContentBox>
//         <ImageInput></ImageInput>
//       </ContentBox>
//       <h1>{category} {category}</h1>
//       <CaptionInput
//         placeholder={category}/>
//       <h1>누구와 함께?</h1>
//       <Section>
//         <Dropdown
//           placeholder={category}
//           fluid
//           multiple
//           search
//           selection
//           defaultValue={tagChallenger}
//           options={userOptions}
//           onChange={onSelectTagChallenger}
//         />
//       </Section>
//       <Section>
//           <Dropdown
//             placeholder={category}
//             fluid
//             multiple
//             search
//             selection
//             options={userOptions}
//             defaultValue={relChallenger}
//             onChange={onSelectRelChallenger}
//           />
//         </Section>
//       <Button onClick={onUpload} text="업로드"/>
        
//       </>)}
//     {action !== "CreatePost" ? (<h1>하위</h1>) : (<h1>바위</h1>)}
//     </PostBox>
//   </Wrapper>
// );