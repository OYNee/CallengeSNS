import React from "react";
import styled from "styled-components";
import {HeartEmpty, User, Logo, Home, Search } from "./Icons";
import { useQuery } from "react-apollo-hooks";
import { ME } from "../SharedQueries";
import { Link } from "react-router-dom";


const Footer = styled.footer`
  display: none;
  @media only screen and (max-width:${(props) => props.theme.sm}) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-transform: uppercase;
    font-weight: 600;
    font-size: 12px;
    padding: 10px 0px;
    position: sticky;
    bottom: 0;
    background-color: #FAFAFA;
    border-top: solid 1px rgba(2,2,2,0.3);
  };
`;

const List = styled.ul`
  display: flex;
  width:100%;
  padding:0 10%;
`;

const ListItem = styled.li`
  display: inline-block;
  width: 20%;
  text-align: center;
`;

export default () => {
  const { data } = useQuery(ME);
  return (
    <Footer>
      <List>
        <ListItem>
          <Link to="/">
            <Home />
          </Link>
        </ListItem>
        <ListItem>
          <Link to="/search">
            <Search />
          </Link>
        </ListItem>
        <ListItem>
          <Link to="/explore">
            <Logo />
          </Link>
        </ListItem>
        <ListItem>
          <Link to="/notifications">
            <HeartEmpty />
          </Link>
        </ListItem>
        <ListItem>
          {!data.me ? (
            <Link to="/#">
              <User />
            </Link>
          ) : (
            <Link to={data.me.username}>
              <User />
            </Link>
          )}
        </ListItem>
      </List>
    </Footer>
  );
};
