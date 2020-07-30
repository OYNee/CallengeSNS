import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Input from "../../Components/Input";
import Button from "../../Components/Button";

const Wrapper = styled.div`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Box = styled.div`
  ${(props) => props.theme.whiteBox}
  border-radius:0px;
  width: 100%;
  max-width: 350px;
`;

const StateChanger = styled(Box)`
  text-align: center;
  padding: 20px 0px;
`;

const Link = styled.span`
  color: ${(props) => props.theme.livingCoral};
  cursor: pointer;
`;

const Form = styled(Box)`
  padding: 40px;
  padding-bottom: 30px;
  margin-bottom: 15px;
  form {
    width: 100%;
    input {
      width: 100%;
      &:not(:last-child) {
        margin-bottom: 7px;
      }
    }
    button {
      margin-top: 10px;
    }
  }
`;

export default ({
  action,
  userid,
  email,
  passwd,
  passwdCheck,
  username,
  setAction,
  onSubmit,
  secret,
}) => (
  <Wrapper>
    <Form>
      {action === "logIn" && (
        <>
          <Helmet>
            <title>Log In | ChallengeSNS</title>
          </Helmet>
          <form onSubmit={onSubmit}>
            <Input placeholder={"Email"} {...email} type="email" />
            <Input placeholder={"Password"} {...passwd} type="password" />
            <Button text={"Log in"} />
          </form>
        </>
      )}
      {action === "signUp" && (
        <>
          <Helmet>
            <title>Sign Up | ChallengeSNS</title>
          </Helmet>
          <form onSubmit={onSubmit}>
            <Input placeholder={"ID"} {...userid} />
            <Input placeholder={"Email"} {...email} type="email" />
            <Input placeholder={"Password"} {...passwd} type="Password" />
            <label htmlFor="confirmPasswordInput"></label>
            <Input
              placeholder={"passwdCheck"}
              {...passwdCheck}
              type="Password"
            />
            <Input placeholder={"Username"} {...username} />
            <Button text={"Sign up"} />
          </form>
        </>
      )}
      {action === "confirm" && (
        <>
          <Helmet>
            <title>Confirm Secret | ChallengeSNS</title>
          </Helmet>
          <form onSubmit={onSubmit}>
            <Input placeholder="Paste your secret" required {...secret} />
            <Button text={"Confirm"} />
          </form>
        </>
      )}
    </Form>

    {action !== "confirm" && (
      <StateChanger>
        {action === "logIn" ? (
          <>
            Don't have an account?{" "}
            <Link onClick={() => setAction("signUp")}>Sign up</Link>
          </>
        ) : (
          <>
            Have an account?{" "}
            <Link onClick={() => setAction("logIn")}>Log in</Link>
          </>
        )}
      </StateChanger>
    )}
  </Wrapper>
);
