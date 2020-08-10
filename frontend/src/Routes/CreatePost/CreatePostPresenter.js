import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import { Dropdown } from 'semantic-ui-react'
import Loader from "../../Components/Loader";

const Wrapper = styled.div`
  margin-top: -60PX;
  margin-bottom: 20px;
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Section = styled.div`
  margin-bottom: 50px;
  display: grid;
  grid-gap: 25px;
  grid-template-columns: repeat(4, 160px);
  grid-template-rows: 160px;
  grid-auto-rows: 160px; 
`;

export default (({
    action,
    id,
    setAction,
    onSubmit,
    relChallenger,
    tagChallenger,
    loading,
    data,
    setRelChallenger,
    setTagChallenger
  }) => {
    const onSelectRelChallenger = (e, {value}) => {
        e.preventDefault();
        setRelChallenger(value);
      };
    const onSelectTagChallenger = (e, {value}) => {
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
      if (loading === true) {
        return (
          <Wrapper>
            <Loader />
          </Wrapper>
        );
      } else if (data && data.followingUser){
        const userOptions = data.followingUser.map((user, idx) => ({
            key: idx,
            value: user.id,
            text: `(@${user.username})`,
          }));
        return ( <Wrapper>
            {action === "CreatePost" && (
              <>
                <button onClick={() => setAction("relChallenger")}>
                    relChallenger</button>
                <button onClick={() => setAction("tagChallenger")}>
                tagChallenger</button>
              </>
            )}
            {action === "relChallenger" && (
              <>
                <Section>
                    <Dropdown
                     placeholder='현재 선택된 사용자가 없습니다'
                     fluid
                     multiple
                     search
                    selection
                    options={userOptions}
                    defaultValue={relChallenger}
                    onChange={onSelectRelChallenger}
                    />
                </Section>
                <button onClick={onRelChallenger}>확인</button>
              </>
            )}
            {action === "tagChallenger" && (
              <>
                <Section>
                    <Dropdown
                     placeholder='현재 선택된 사용자가 없습니다'
                     fluid
                     multiple
                     search
                    selection
                    defaultValue={tagChallenger}
                    options={userOptions}
                    onChange={onSelectTagChallenger}
                    />
                </Section>
                <button onClick={onTagChallenger}>확인</button>
              </>
            )}
        </Wrapper>);
      }
      
   
  });
  