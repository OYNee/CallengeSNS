import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
//styled-components의 최신 방식(global styles)
export default createGlobalStyle`
    ${reset};
    *{
        box-sizing:border-box;
    }
`;
