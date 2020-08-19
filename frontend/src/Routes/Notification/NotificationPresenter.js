import React from "react";
import styled from "styled-components";
import Loader from "../../Components/Loader";
import NotiCard1 from "../../Components/NotiCard1";
import NotiCard2 from "../../Components/NotiCard2";
import {
  PanelBar,
  PanelBarUtils,
  PanelBarItem,
} from "@progress/kendo-react-layout";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 80vh;
  @media only screen and (max-width: ${(props) => props.theme.sm}) {
    min-height: 100vh;
  }
`;

export default ({ loading, data }) => {
  if (loading === true) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  } else if (data && data.seeUser) {

    return (
      <Wrapper>
        <PanelBar expandMode={"multiple"} style={{maxWidth:"700px"},{width:"700px"}}>
          <PanelBarItem title={"지목 받은 챌린지"} expanded={true}>
            {data.seeUser.relChallenger.map((relChallenger, idx) => (
              <NotiCard1 
              id={relChallenger.id}
              nickname={relChallenger.user.nickname}
              username={relChallenger.user.username}
              url={relChallenger.user.avatar}/>
             
            ))}
          </PanelBarItem>
          <PanelBarItem title={"같이 참여한 챌린지"} expanded={true}>
            {data.seeUser.tagChallenger.map((tagChallenger, idx) => (
               <NotiCard2
               id={tagChallenger.id}
               nickname={tagChallenger.user.nickname}
               username={tagChallenger.user.username}
               url={tagChallenger.user.avatar}/>
            ))}
          </PanelBarItem>
        </PanelBar>
      </Wrapper>
    );
  } else {
    window.location.reload();
  }
};
