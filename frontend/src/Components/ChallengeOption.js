import React, { useState } from "react";
import { Dropdown, Button, Modal, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useMutation } from "react-apollo-hooks";
import useInput from "../Hooks/useInput";

const CaptionInput = styled.textarea`
  border: 0;
  border: ${(props) => props.theme.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius};
  width:86vw;
  height 20vh;
  font-size: 12px;
  padding: 0px 15px;
  resize: none;
  @media only screen and (min-width:${(props) => props.theme.sm}) {
    width: 100%;
  }
`;
const option = () => <Icon name="ellipsis horizontal" size="large" />;
let caption = "";
let id = "";

export const EDIT_CHALLENGE = gql`
  mutation editChallenge($id: String!, $caption: String) {
    editChallenge(id: $id, caption: $caption) {
      id
    }
  }
`;
export const DELETE_CHALLENGE = gql`
  mutation deleteChallenge($id: String!) {
    deleteChallenge(id: $id) {
      id
    }
  }
`;

const DropdownMenu = ({ defaultCaption, pid }) => {
  caption = useInput(defaultCaption);
  id = pid;
  return (
    <Dropdown icon={option}>
      <Dropdown.Menu>
        <Dropdown.Item as={ModiModal} />
        <Dropdown.Item as={DelModal} />
      </Dropdown.Menu>
    </Dropdown>
  );
};

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

const ModiModal = () => {
  console.log(caption);
  const [state, dispatch] = React.useReducer(exampleReducer, {
    open: false,
    size: undefined,
  });
  const { open, size } = state;
  const editMutation = useMutation(EDIT_CHALLENGE);

  return (
    <>
      <Dropdown.Item onClick={() => dispatch({ type: "open", size: "tiny" })}>
        수정하기
      </Dropdown.Item>

      <Modal
        size={size}
        open={open}
        onClose={() => dispatch({ type: "close" })}
      >
        <Modal.Header>캡션 수정</Modal.Header>
        <Modal.Content>
          <CaptionInput placeholder="한마디 부탁해요!" {...caption} />
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => dispatch({ type: "close" })}>
            CANCEL
          </Button>
          <Button
            positive
            onClick={async (e) => {
              try {
                const {
                  data: { editChallenge },
                } = await editMutation({
                  variables: {
                    id: id,
                    caption: caption.value,
                  },
                });
                if (editChallenge) {
                  console.log("OK");
                  window.location.reload = "/";
                } else {
                  console.log("FAIL");
                }
              } catch (error) {}
            }}
          >
            SAVE
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

const DelModal = () => {
  console.log(id);
  const [state, dispatch] = React.useReducer(exampleReducer, {
    open: false,
    size: undefined,
  });
  const { open, size } = state;
  const deleteMutation = useMutation(DELETE_CHALLENGE);

  return (
    <>
      <Dropdown.Item onClick={() => dispatch({ type: "open", size: "tiny" })}>
        삭제하기
      </Dropdown.Item>

      <Modal
        size={size}
        open={open}
        onClose={() => dispatch({ type: "close" })}
      >
        <Modal.Header>챌린지를 삭제할까요?</Modal.Header>

        <Modal.Actions>
          <Button negative onClick={() => dispatch({ type: "close" })}>
            No
          </Button>
          <Button
            positive
            onClick={async (e) => {
              try {
                const {
                  data: { deleteChallenge },
                } = await deleteMutation({
                  variables: {
                    id: id,
                  },
                });
                if (deleteChallenge) {
                  console.log("OK");
                  window.location.reload = "/";
                } else {
                  console.log("FAIL");
                }
              } catch (error) {}
            }}
          >
            Yes
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default DropdownMenu;
