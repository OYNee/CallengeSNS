import React from "react";
import { Dropdown, Button, Modal } from "semantic-ui-react";
import { Link } from "react-router-dom";

// TODO: This is missing functionality for sub-menu here from SUI core examples.
// The "Publish To Web" item should contain a sub-menu.

const DropdownMenu = () => (
  <Dropdown>
    <Dropdown.Menu>
      {/* <Dropdown.Item text="비밀번호 변경" as={Link} to="/setpasswd" />
      <Dropdown.Item text="공개 범위" as={Link} to="/setscope" />
      <Dropdown.Item text="관심 설정" as={Link} to="/setcategory" /> */}
      <Dropdown.Item text="비밀번호 변경" />
      <Dropdown.Item text="공개 범위" />
      <Dropdown.Item text="관심 설정" />
      <Dropdown.Item as={DelAccModal} />
      <Dropdown.Item as={LogoutModal} />
    </Dropdown.Menu>
  </Dropdown>
);

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
      <Dropdown.Item onClick={() => dispatch({ type: "open", size: "tiny" })}>
        회원 탈퇴
      </Dropdown.Item>

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
      <Dropdown.Item onClick={() => dispatch({ type: "open", size: "tiny" })}>
        로그아웃
      </Dropdown.Item>

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

export default DropdownMenu;
