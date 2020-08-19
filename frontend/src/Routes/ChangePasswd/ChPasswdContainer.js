import React from "react";
import DelAccPresenter from "./ChPasswdPresenter";
import useInput from "../../Hooks/useInput";
import { useMutation } from "react-apollo-hooks";
import { SET_PASSWD } from "./ChPasswdQueries";
import { toast } from "react-toastify";

export default () => {
  const passwd = useInput("");
  const newPasswd = useInput("");
  const passwdCheck = useInput("");

  const setPasswd = useMutation(SET_PASSWD, {
    variables: { passwd: passwd.value, newPasswd: newPasswd.value },
  });

  const onSubmit = async (e) => {
    if (passwd.value !== "") {
      try {
        const {
          data: { changePasswd },
        } = await setPasswd();
        console.log(changePasswd);
        if (!changePasswd) {
          toast.error("Error");
          throw Error();
        } else {
          //변경완료 확인창 띄우기
          // setTimeout(() => setAction("profile"), 3000);
          window.location.href = "/";
        }
      } catch {
        toast.error("패스워드가 일치하지 않습니다");
      }
    } else if (
      passwd.value === "" &&
      newPasswd.value === "" &&
      passwdCheck.value === ""
    ) {
      toast.error("password is required");
    }
  };
  return (
    <DelAccPresenter
      passwd={passwd}
      newPasswd={newPasswd}
      passwdCheck={passwdCheck}
      onSubmit={onSubmit}
    />
  );
};
