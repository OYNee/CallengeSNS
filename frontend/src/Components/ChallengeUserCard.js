import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Avatar from "./Avatar";
import FatText from "./FatText";
import { Link } from "react-router-dom";
import FollowButton from "./FollowButton";

const Card = styled.div`
  ${props => props.theme.whiteBox}
  display:flex;
  flex-direction: row;
  justify-content:space-between;
  align-items: center;
  padding: 10px;
  width:100%;
  max-width: 700px;
  margin:10px auto;
`;

const EAvatar = styled(Avatar)`
  margin-right: 10px;
  min-width: 50px;
`;

const ELink = styled(Link)`
  color: inherit;
  margin: 5px 10px;
`;

const Temp = styled.p`
  margin: 5px 10px;
`

const ChallengeUserCard  = ({ id, username, isFollowing, url, isSelf,bio }) => (
  <Card>
    <EAvatar url={url} size={"sm"} />
  
    <ELink to={`/challengepost?${id}`}>
        <FatText text={username} />
      </ELink>
      <Temp>{bio}</Temp>

    {!isSelf && <FollowButton id={id} isFollowing={isFollowing} />}
  </Card>
);

ChallengeUserCard .propTypes = {
  id: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  isFollowing: PropTypes.bool.isRequired,
  url: PropTypes.string.isRequired,
  isSelf: PropTypes.bool.isRequired
};

export default ChallengeUserCard ;
