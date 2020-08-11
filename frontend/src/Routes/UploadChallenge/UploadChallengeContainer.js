import React, { useState } from "react";
import AuthPresenter from "./AuthPresenter";
import useInput from "../../Hooks/useInput";
import { useMutation } from "react-apollo-hooks";
import styled from "styled-components";
import { gql } from "apollo-boost";

export default () => {
    const [upload, setUpload] = useState()
    const caption = useInput("");
    const 
}
