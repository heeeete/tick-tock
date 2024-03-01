import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const AppContainer = styled.div`
  display: flex;
  width: 100dvw;
  height: 100dvh;
  align-items: center;
  justify-content: center;
`;

const Clock = styled.div`
  width: 40dvw;
  height: 40dvw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HourHand = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: ${(props) => props.$clocksize.height / 17}px;
  left: calc(50% - ${(props) => props.$clocksize.height / 18 / 2}px);
  bottom: 50%;
  transform-origin: bottom;
  transform: rotateZ(${(props) => props.$hours * 30 + props.$minutes / 2}deg);
  font-size: ${(props) => props.$clocksize.height / 20}px;
  transition: transform 1s ease;

  /* background-color: blue; */
  & > * {
    /* margin-block: ${(props) => props.$clocksize.height / 1000}px; */
  }
`;
const MinuteHand = styled.div`
  text-align: center;
  display: flex;

  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: calc(50% - ${(props) => props.$clocksize.height / 18 / 2}px);
  bottom: 50%;
  width: ${(props) => props.$clocksize.height / 17}px;
  transform-origin: bottom;
  font-size: ${(props) => props.$clocksize.height / 20}px;
  transform: rotateZ(${(props) => props.$minutes * 6}deg);
  transition: transform 1s ease;

  /* background-color: green; */
  & > * {
    /* margin-block: ${(props) => props.$clocksize.height / 1000}px; */
  }
`;
const SecondHand = styled.div`
  text-align: center;
  display: flex;

  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: ${(props) => props.$clocksize.height / 17}px;
  left: calc(50% - ${(props) => props.$clocksize.height / 18 / 2}px);
  bottom: 50%;
  transform-origin: bottom;
  font-size: ${(props) => props.$clocksize.height / 40}px;
  transform: rotateZ(${(props) => props.$seconds * 6}deg);
  transition: transform 1s ease;
  /* background-color: purple; */

  & > * {
    margin-block: ${(props) => props.$clocksize.height / 70}px;
  }
`;

const Origin = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 13.3%;
  height: 13.3%;
  background-color: white;
  z-index: 1;
  border-radius: 50%;
`;

const HoursHandText = styled.div`
  transform: rotateZ(-${(props) => props.$hours * 30 + props.$minutes / 2}deg);
`;
const MinutesHandText = styled.div`
  transform: rotateZ(-${(props) => props.$minutes * 6}deg);
`;
const SecondsHandText = styled.div`
  transform: rotateZ(-${(props) => props.$seconds * 6}deg);
`;

function App() {
  const [date, setDate] = useState(new Date());
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [hoursArr, setHoursArr] = useState([]);
  const clockRef = useRef(null);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  // let minutes = 22;
  // let seconds = 52;

  // let seconds = 0;

  useEffect(() => {
    const timerId = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  useEffect(() => {
    const clockReSize = () => {
      if (clockRef.current) {
        setDimensions({
          width: clockRef.current.offsetWidth,
          height: clockRef.current.offsetHeight,
        });
      }
    };
    clockReSize();
    window.addEventListener("resize", clockReSize);
    return () => window.removeEventListener("resize", clockReSize);
  }, []);

  return (
    <AppContainer>
      <Clock ref={clockRef}>
        <Origin>PM</Origin>
        <HourHand $hours={hours} $minutes={minutes} $clocksize={dimensions}>
          <HoursHandText $hours={hours} $minutes={minutes}>
            {hours}
          </HoursHandText>
          <HoursHandText $hours={hours} $minutes={minutes}>
            {hours}
          </HoursHandText>
          <HoursHandText $hours={hours} $minutes={minutes}>
            {hours}
          </HoursHandText>
          <HoursHandText $hours={hours} $minutes={minutes}>
            {hours}
          </HoursHandText>
          <HoursHandText $hours={hours} $minutes={minutes}>
            {hours}
          </HoursHandText>
          <HoursHandText $hours={hours} $minutes={minutes}>
            {hours}
          </HoursHandText>
          <HoursHandText $hours={hours} $minutes={minutes}>
            {hours}
          </HoursHandText>
          <HoursHandText $hours={hours} $minutes={minutes}>
            {hours}
          </HoursHandText>
        </HourHand>
        <MinuteHand $minutes={minutes} $clocksize={dimensions}>
          <MinutesHandText $minutes={minutes}>{minutes}</MinutesHandText>
          <MinutesHandText $minutes={minutes}>{minutes}</MinutesHandText>
          <MinutesHandText $minutes={minutes}>{minutes}</MinutesHandText>
          <MinutesHandText $minutes={minutes}>{minutes}</MinutesHandText>
          <MinutesHandText $minutes={minutes}>{minutes}</MinutesHandText>
          <MinutesHandText $minutes={minutes}>{minutes}</MinutesHandText>
        </MinuteHand>
        <SecondHand $seconds={seconds} $clocksize={dimensions}>
          <SecondsHandText $clocksize={dimensions} $seconds={seconds}>
            {seconds}
          </SecondsHandText>
          <SecondsHandText $clocksize={dimensions} $seconds={seconds}>
            {seconds}
          </SecondsHandText>
          <SecondsHandText $clocksize={dimensions} $seconds={seconds}>
            {seconds}
          </SecondsHandText>
          <SecondsHandText $clocksize={dimensions} $seconds={seconds}>
            {seconds}
          </SecondsHandText>
          <SecondsHandText $clocksize={dimensions} $seconds={seconds}>
            {seconds}
          </SecondsHandText>
          <SecondsHandText $clocksize={dimensions} $seconds={seconds}>
            {seconds}
          </SecondsHandText>
          <SecondsHandText $clocksize={dimensions} $seconds={seconds}>
            {seconds}
          </SecondsHandText>
          <SecondsHandText $clocksize={dimensions} $seconds={seconds}>
            {seconds}
          </SecondsHandText>
        </SecondHand>
      </Clock>
    </AppContainer>
  );
}

export default App;
