import React from "react";
import styled from "styled-components";
import Loader from "../../Components/Loader";
import FatText from "../../Components/FatText";
import { PanelBar, PanelBarUtils } from '@progress/kendo-react-layout';
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
export default ({
  loading,
  data
}) => {
 
  if (loading === true) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  }else if(data && data.seeUser){

    const cildrens1 =data.seeUser.relChallenger.map((relChallenger,id)=>({
      id: relChallenger.id, title: `${relChallenger.user.nickname}(@${relChallenger.user.username})님이 회원님을 지목하였습니다.`
    }));
    const cildrens2 =data.seeUser.tagChallenger.map((tagChallenger,id)=>({
      id: tagChallenger.id, title: `${tagChallenger.user.nickname}(@${tagChallenger.user.username})님이 회원님을 피드에 태그하였습니다.`
    }));
    const items = [
      {
          id: 1, title: '지목 받은 챌린지', children:cildrens1
      },
      {
          id: 5, title: '같이 참여한 챌린지', children: cildrens2
      }
  ];
    return(
      <Wrapper>
      <FatText text="공지사항"></FatText>
      <PanelBar
      children={PanelBarUtils.mapItemsToComponents(items)}
      expandMode={'multiple'}
      />
       <Link to={`/challengepost?`}>ddd</Link>
    </Wrapper>
    );

  }
};
