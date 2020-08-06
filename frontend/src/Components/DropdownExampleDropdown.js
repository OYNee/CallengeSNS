import React from "react";
import { Dropdown } from "semantic-ui-react";

// TODO: This is missing functionality for sub-menu here from SUI core examples.
// The "Publish To Web" item should contain a sub-menu.

const DropdownMenu = () => (
  <Dropdown>
    <Dropdown.Menu>
      <Dropdown.Item text="비밀번호 변경" />
      <Dropdown.Item text="공개 범위" />
      <Dropdown.Item text="관심 설정" />
      <Dropdown.Item text="로그아웃" />
    </Dropdown.Menu>
  </Dropdown>
);

export default DropdownMenu;
