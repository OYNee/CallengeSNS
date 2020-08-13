import React from "react";
import Bar from "./Bar";
import useAudioPlayer from './useAudioPlayer';
import styled from "styled-components";



const AudioBox = styled.div`
  width:86vw;
  height:86vw;
`
const ControlBox = styled.div`
  width:100%;
  height:100%;
  position:relative;
`

const Button = styled.button`
  width: 20vw;
  height: 20vw;
  border: 0;
  position: absolute;
  top: 30vw;
  left: 33vw;
`

const Audio = ({videourl, imgurl}) => {
  const { curTime, duration, playing, setPlaying, setClickedTime } = useAudioPlayer();

  return (
    <AudioBox style={{backgroundImage: `url(${imgurl})`,
    backgroundSize: `contain`,
    backgroundRepeat: `round`,}} onClick={() => setPlaying(!playing)}>
      <audio id="audio">
        <source src={videourl} />
      </audio>
      <ControlBox>
        {playing ? 
          <Button>정지</Button> :
          <Button>재생</Button>
        }
        <Bar curTime={curTime} duration={duration} onTimeUpdate={(time) => setClickedTime(time)}/>
      </ControlBox>
    </AudioBox>
  );
}

export default Audio;
