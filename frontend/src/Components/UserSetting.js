import React, { useState } from "react";
import { Dropdown, Button, Modal } from "semantic-ui-react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { DropdownIcon } from "../Components/Icons";

// TODO: This is missing functionality for sub-menu here from SUI core examples.
// The "Publish To Web" item should contain a sub-menu.

const Username = styled.span`
  font-size: 7vw;
  display: inline-block;
`;

const CloseBox = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 80px;
  left: 0px;
  background: white;
`;

const DropDownContainer = styled("div")`
  display: flex;
`;

const DropDownHeader = styled("div")`
  display: block;
`;

const DropDownListContainer = styled("div")`
  position: absolute;
  top: 130px;
`;

const DropDownList = styled("ul")`
  padding: 0;
  margin: 0;
  background: #ffffff;
  border: 2px solid #e5e5e5;
  // position:absolute;
  &:first-child {
  }
`;

const ListItem = styled("a")`
  list-style: none;
  display:block
  padding: 0.8em;
  font-size:16px;
  cursor:default;
  color:black;
  &:hover {
    color:${(props) => props.theme.livingCoral};
    background-color:rgba(0,0,0,0.01)
  }
`;

function exampleReducer(state, action) {
  switch (action.type) {
    case "close":
      return { open: false };
    case "open":
      return { open: true, size: action.size };
    default:
      throw new Error("Unsupported action...");
  }
}

const DelAccModal = () => {
  const [state, dispatch] = React.useReducer(exampleReducer, {
    open: false,
    size: undefined,
  });
  const { open, size } = state;

  return (
    <>
      <ListItem onClick={() => dispatch({ type: "open", size: "tiny" })}>
        회원 탈퇴
      </ListItem>

      <Modal
        size={size}
        open={open}
        onClose={() => dispatch({ type: "close" })}
      >
        <Modal.Header>회원 탈퇴</Modal.Header>
        <Modal.Content>
          <p>정말로 탈퇴하시겠어요?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => dispatch({ type: "close" })}>
            No
          </Button>
          <Button positive as={Link} to="/deleteacc">
            Yes
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

const LogoutModal = () => {
  const [state, dispatch] = React.useReducer(exampleReducer, {
    open: false,
    size: undefined,
  });
  const { open, size } = state;

  return (
    <>
      <ListItem onClick={() => dispatch({ type: "open", size: "tiny" })}>
        로그아웃
      </ListItem>

      <Modal
        size={size}
        open={open}
        onClose={() => dispatch({ type: "close" })}
      >
        <Modal.Header>로그아웃하시겠어요?</Modal.Header>

        <Modal.Actions>
          <Button negative onClick={() => dispatch({ type: "close" })}>
            No
          </Button>
          <Button positive onClick={() => logout()}>
            Yes
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};
function logout() {
  localStorage.removeItem("token");
  window.location.reload();
  return null;
}

const DropdownMenu = ({ username }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggling = () => setIsOpen(!isOpen);

  return (
    <DropDownContainer>
      <DropDownHeader onClick={toggling} className={isOpen ? "dropOpen" : ""}>
        <Username>{username}</Username>
        <DropdownIcon />
      </DropDownHeader>
      {isOpen && (
        <DropDownListContainer>
          <DropDownList>
            {/* 
            <ListItem as={Link} to="/setscope">공개 범위</ListItem>
            <ListItem as={Link} to="/setcatego">관심 설정</ListItem> */}
            <ListItem as={Link} to="/setpasswd">
              비밀번호 변경
            </ListItem>
            <ListItem>공개 범위</ListItem>
            <ListItem>관심 설정</ListItem>
            <ListItem as={DelAccModal}>회원탈퇴</ListItem>
            <ListItem as={LogoutModal}>로그아웃</ListItem>
          </DropDownList>
        </DropDownListContainer>
      )}
    </DropDownContainer>
  );
};

export default DropdownMenu;
