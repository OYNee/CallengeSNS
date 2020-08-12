import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import FatText from "./FatText";
import { Link } from "react-router-dom";

const Card = styled.div`
  ${props => props.theme.whiteBox}
  display:flex;
  flex-direction: row;
  justify-content:space-between;
  align-items: center;
  padding: 10px;
  width:95%;
  max-width: 700px;
  margin:10px auto;
`;


const ELink = styled(Link)`
  color: inherit;
  margin: 5px 10px;
`;

const HashtagCard = ({ id, username}) => (
  <Card> 
      <ELink to={`challenge/${username}`}>
        <FatText text={username} />
      </ELink>
  </Card>
);

export default HashtagCard;
