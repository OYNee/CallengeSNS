import React, { useState } from "react";
import styled from "styled-components";

const Img = styled.img`
  width:100%;
  height: 100%;
`
const Wrapper = styled.div`
  width:90vw;
  height:90vw;
  background-color:violet;
`
const Blank = styled.div`
  width:100%;
  height:100%;
  background-color:violet;
`

const ImageInput = () => {
  const [image, setImage] = useState({ preview: "", raw: "" });
  
  const handleChange = e => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0]
      });
    }
  };
  
  // const handleUpload = async e => {
  //   e.preventDefault();
  //   const formData = new FormData();
  //   formData.append("image", image.raw);
  
  //   await fetch("YOUR_URL", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "multipart/form-data"
  //     },
  //     body: formData
  //   });
  // };
  return (
    <Wrapper>
      <label htmlFor="upload-button">
        {image.preview ? (
          <Img src={image.preview} alt={"dummy"}/>
        ) : (
          <Blank>눌러서 사진 올리기</Blank>
        )}
      </label>
      <input
        type="file"
        id="upload-button"
        style={{ display: "none" }}
        onChange={handleChange}
      />
      {/* <br /> */}
      {/* <button onClick={handleUpload}>Upload</button> */}
    </Wrapper>
  );
}


export default ImageInput