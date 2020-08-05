import React from "react";
import { Dropdown } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";

// TODO: This is missing functionality for sub-menu here from SUI core examples.
// The "Publish To Web" item should contain a sub-menu.

const DropdownMenu = () => (
  <Dropdown>
    <Dropdown.Menu>
      <Dropdown.Item text="비밀번호 변경" as={Link} to="/set/passwd" />
      <Dropdown.Item text="공개 범위" as={Link} to="/set/scope" />
      <Dropdown.Item text="관심 설정" as={Link} to="/set/category" />
      <Dropdown.Item text="회원 탈퇴" />
      <Dropdown.Item text="로그아웃" />
    </Dropdown.Menu>
  </Dropdown>
);

export default DropdownMenu;
