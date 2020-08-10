import React from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import {
  WebHeartEmpty,
  WebUser,
  WebLogo,
  Home,
  TextLogo,
  WebSearch,
} from "./Icons";
import { useQuery } from "react-apollo-hooks";
import { ME } from "../SharedQueries";
import {
  Button,
  Checkbox,
  Grid,
  Icon,
  Image,
  Menu,
  Segment,
  Sidebar,
} from "semantic-ui-react";

const Wrapper = styled.div`
  width: 100%;
  border: 0;
  position: fixed;
  top: 0;
  left: 0;
  background-color: white;
  border-bottom: ${(props) => props.theme.boxBorder};
  border-radius: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;

const Header = styled.header`
  width: 100%;
  @media only screen and (max-width: ${(props) => props.theme.sm}) {
    display: none;
  }
`;

const MobileHeader = styled.header`
  @media only screen and (min-width: ${(props) => props.theme.sm}) {
    display: none;
  }
`;

const HeaderWrapper = styled.div`
  margin: auto 10px;
  max-width: 100%;
  display: flex;
  justify-content: center;
`;

const HeaderColumn = styled.div`
  width: 33%;
  text-align: center;
  padding-top: 25px;
  min-width: 400px;
  &:first-child {
    margin-right: auto;
    text-align: left;
  }
  &:last-child {
    margin-left: auto;
    text-align: right;
  }
`;

const TextLogoColumn = styled.div`
  width: 33%;
  text-align: center;
  &:first-child {
    margin-right: auto;
    text-align: left;
  }
  &:last-child {
    margin-left: auto;
    text-align: right;
  }
`;

const HeaderLink = styled(Link)`
  &:not(:last-child) {
    margin-right: 30px;
  }
`;

export default withRouter(() => {
  const { data } = useQuery(ME);
  return (
    <Wrapper>
      <Header>
        <HeaderWrapper>
          <TextLogoColumn>
            <Link to="/">
              <TextLogo />
            </Link>
          </TextLogoColumn>
          <HeaderColumn>
          {!data.me ? (
              <HeaderLink to="/#">
                <WebLogo />
              </HeaderLink>
            ) : (
              <HeaderLink to={`/createpost?${data.me.id}`}>
              <WebLogo />
            </HeaderLink>
            )}
            <HeaderLink to="/search">
              <WebSearch />
            </HeaderLink>
            <HeaderLink to="/notifications" replace>
              <WebHeartEmpty />
            </HeaderLink>
            {!data.me ? (
              <HeaderLink to="/#" replace>
                <WebUser />
              </HeaderLink>
            ) : (
              <HeaderLink to={data.me.username} replace>
                <WebUser />
              </HeaderLink>
            )}
          </HeaderColumn>
        </HeaderWrapper>
      </Header>
      <MobileHeader>
        <TextLogo />
      </MobileHeader>
    </Wrapper>
  );
});
