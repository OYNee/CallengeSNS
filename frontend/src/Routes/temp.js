// import React, { useRef, useState } from "react";
// import { Helmet } from "react-helmet";
// import styled from "styled-components";
// import ImageInput from "../Components/ImageInput";
// import Button from "../Components/Button";

// const Wrapper = styled.div`
//   padding: 3vw;
//   margin: 0 4vw;
//   @media only screen and (max-width: ${(props) => props.theme.sm});
// `;
// const Section = styled.div`
//   width: 100%;
//   margin: 15px auto;
// `;

// const PostBox = styled.div`
//   width: 86vw;
//   background-color: rgba(0, 0, 0, 0);
//   margin: 3vw auto;
//   border-radius: 10px;
// `;

// const ContentBox = styled.div`
//   width: 86vw;
//   height: 86vw;
// `;

// const CaptionInput = styled.textarea`
//   border: 0;
//   border: ${(props) => props.theme.boxBorder};
//   border-radius: ${(props) => props.theme.borderRadius};
//   width:86vw;
//   height 20vh;
//   font-size: 12px;
//   padding: 0px 15px;
//   resize: none;
// `;

// const CompleteButton = styled.button`
//   height: 10vh;
// `;
// const action = "CreatePost";
// // 추가되는 부분
// const imageInput = "";
// const [images, setImages] = useState([
//   {
//     id: 1,
//     imageInput: { ImageInput },
//   },
// ]);
// const nextId = useRef(2);

// const onCreate = () => {
//   const image = {
//     id: nextId.current,
//     imageInput,
//   };
//   setImages(images.concat(image));
//   nextId.current += 1;
// };
// export default ({}) => {
//   const addImage = (e) => {};
//   const delImage = (e) => {
//     console.log("제거");
//   };
//   if (action === "CreatePost") {
//     return (
//       <Wrapper>
//         <PostBox>
//           {action === "CreatePost" && (
//             <>
//               <Helmet>
//                 <title>Image Challenge | ChallengeSNS</title>
//               </Helmet>
//               <ContentBox id="contentBox"></ContentBox>
//               <Button onClick={addImage} text="+"></Button>
//               <Button onClick={delImage} text="-"></Button>
//             </>
//           )}
//         </PostBox>
//       </Wrapper>
//     );
//   } else {
//     return <Wrapper>하위</Wrapper>;
//   }
// };
