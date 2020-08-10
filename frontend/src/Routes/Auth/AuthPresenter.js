import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import LogoImage from "../../Styles/Images/tempLogo.png";

const LogoBox = styled.img`
  width: 100%;
  margin-bottom: 30px;
`;

const Wrapper = styled.div`
  margin-top: -60PX;
  margin-bottom: 20px;
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
  @media only screen and (max-width:${(props) => props.theme.sm}) {
    max-width: 350px;
  };
  @media only screen and (min-width:${(props) => props.theme.sm}) {
    max-width: 400px;
  };
  @media only screen and (min-width:${(props) => props.theme.md}) {
    max-width: 450px;
  };
  @media only screen and (min-width:${(props) => props.theme.lg}) {
    max-width: 500px;
  };
  @media only screen and (min-width:${(props) => props.theme.xl}) {
    max-width: 600px;
  };
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
  nickname,
  email,
  passwd,
  passwdCheck,
  username,
  setAction,
  onSubmit,
}) => (
  <Wrapper>
    <Form>
      <LogoBox src={LogoImage}></LogoBox>
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
            <Input placeholder={"ID"} {...nickname} />
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
      {action === "findPasswd" && (
        <>
          <Helmet>
            <title>Find Password | ChallengeSNS</title>
          </Helmet>
          <form onSubmit={onSubmit}>
            <Input placeholder={"Email"} {...email} type="email" />
            <Button text={"Find"} />
          </form>
        </>
      )}
      {action === "confirm" && (
        <>
          <Helmet>
            <title>Confirm Secret | ChallengeSNS</title>
          </Helmet>
          <form onSubmit={onSubmit}>
            <Input
              placeholder="your new password"
              required
              {...passwd}
              type="Password"
            />
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
            <br />
            <br />
            Did you forget your password?{" "}
            <Link onClick={() => setAction("findPasswd")}>Find password</Link>
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
