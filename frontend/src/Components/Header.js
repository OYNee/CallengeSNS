import React from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import { HeartEmpty, User, Logo, Home, TextLogo, } from "./Icons";
import { useQuery } from "react-apollo-hooks";
import { ME } from "../SharedQueries";

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
  @media only screen and (max-width:${(props) => props.theme.sm}) {
    display: none;
  };
`;

const MobileHeader = styled.header`
  @media only screen and (min-width:${(props) => props.theme.sm}) {
    display: none;
  };
`;

const HeaderWrapper = styled.div`
  width: 100%;
  max-width: ${(props) => props.theme.maxWidth};
  display: flex;
  justify-content: center;
`;

const HeaderColumn = styled.div`
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
          <HeaderColumn>
            <Link to="/explore">
              <Logo />
            </Link>
          </HeaderColumn>
          <HeaderColumn>
          <Link to="/explore">
              <Logo />
            </Link>
          </HeaderColumn>
          <HeaderColumn>
            <HeaderLink to="/">
              <Home />
            </HeaderLink>
            <HeaderLink to="/search">
              <HeartEmpty />
            </HeaderLink>
            <HeaderLink to="/notifications">
              <HeartEmpty />
            </HeaderLink>
            {!data.me ? (
              <HeaderLink to="/#">
                <User />
              </HeaderLink>
            ) : (
              <HeaderLink to={data.me.username}>
                <User />
              </HeaderLink>
            )}
          </HeaderColumn>
        </HeaderWrapper>
      </Header>
      <MobileHeader><TextLogo /></MobileHeader>
    </Wrapper>
  );
});
