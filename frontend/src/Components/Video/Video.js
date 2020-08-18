import React from "react";
import Bar from "./Bar";
import useVideoPlayer from './useVideoPlayer';
import styled from "styled-components";



const VideoBox = styled.div`
  width:86vw;
  position:relative;
`
const ControlBox = styled.div`
  width:100%;
  height:100%;
  
`

const Button = styled.button`
  width: 20vw;
  height: 20vw;
  border: 0;
  position: absolute;
  top: 30vw;
  left: 33vw;
`

const Video = ({videoURL, videoID}) => {
  const { curTime, duration, playing, setPlaying, setClickedTime } = useVideoPlayer(videoID);

  return (
    <VideoBox onClick={() => setPlaying(!playing)}>
      <video id={videoID} width="100%">
        <source src={videoURL} />
      </video>
      <ControlBox>
        {playing ? 
          <Button>정지</Button> :
          <Button>재생</Button>
        }
        <Bar curTime={curTime} duration={duration} onTimeUpdate={(time) => setClickedTime(time)}/>
      </ControlBox>
    </VideoBox>
  );
}

export default Video;
