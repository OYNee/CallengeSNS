import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Input from "../../Components/Input";
import ImageInput from "../../Components/ImageInput";
import Button from "../../Components/Button";
import { Dropdown } from "semantic-ui-react";
import Loader from "../../Components/Loader";



const Wrapper = styled.div`
  // display: flex;
  // align-items: center;
  // justify-content: center;
  // flex-direction: column;
  padding:0;
  margin:0;
  height:200vh
`;
const Section = styled.div`
  margin-bottom: 50px;
  display: grid;
  grid-gap: 25px;
  grid-template-columns: repeat(4, 160px);
  grid-template-rows: 160px;
  grid-auto-rows: 160px;
`;

const PostBox = styled.div`
  width : 100%;
  background-color:white;
  padding: 5vw;
`;

const ContentBox = styled.div`
  width: 90vw;
  height: 90vw;
  margin: auto;
  border:1px solid red;
`;

const TagBox = styled.div`
  height:10vh;
  border:1px solid blue;
`;

const RelBox = styled.div`
  height:10vh;
  border:1px solid violet;
`;

const CaptionBox = styled.div`
  height:10vh;
  border:1px solid purple;
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
  photo,
  onSubmit,
  relChallenger,
  tagChallenger,
  loading,
  data,
  setRelChallenger,
  setTagChallenger,
  aa,
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
      // <Wrapper>
      //   {action === "CreatePost" && (
      //     <>
      //       <button onClick={() => setAction("relChallenger")}>
      //         relChallenger
      //       </button>
      //       <button onClick={() => setAction("tagChallenger")}>
      //         tagChallenger
      //       </button>
      //       <input type="file" name="photo" id="photo" />
      //       <button onClick={onUpload}>업로드하기</button>
      //     </>
      //   )}
      //   {action === "relChallenger" && (
      //     <>
      //       <Section>
      //         <Dropdown
      //           placeholder="현재 선택된 사용자가 없습니다"
      //           fluid
      //           multiple
      //           search
      //           selection
      //           options={userOptions}
      //           defaultValue={relChallenger}
      //           onChange={onSelectRelChallenger}
      //         />
      //       </Section>
      //       <button onClick={onRelChallenger}>확인</button>
      //     </>
      //   )}
      //   {action === "tagChallenger" && (
      //     <>
      //       <Section>
      //         <Dropdown
      //           placeholder="현재 선택된 사용자가 없습니다"
      //           fluid
      //           multiple
      //           search
      //           selection
      //           defaultValue={tagChallenger}
      //           options={userOptions}
      //           onChange={onSelectTagChallenger}
      //         />
      //       </Section>
      //       <button onClick={onTagChallenger}>확인</button>
      //     </>
      //   )}
      // </Wrapper>
      <Wrapper>
        {action === "CreatePost" && (
        <PostBox>
          <ContentBox>
            <ImageInput></ImageInput>
          </ContentBox>
          <TagBox>
            {aa}
          </TagBox>
          <RelBox>
            지목 박스 텍스트
          </RelBox>
          <CaptionBox>
            한줄소감
          </CaptionBox>
          <CompleteButton>작성완료</CompleteButton>
        </PostBox>
      )}
      </Wrapper>
    );
  } else {
      return (
      <Wrapper>
        하위
      </Wrapper>
      )
    }
};
