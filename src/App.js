import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import moment from "moment-timezone";

const AppContainer = styled.div`
	display: flex;
	color: white;

	width: 100dvw;
	height: 100dvh;
	background: radial-gradient(
		circle at center,
		grey,
		black
			${(props) => {
				if (props.$hours >= 18) {
					return `${120 - props.$hours * 3}%`;
				} else if (props.$hours < 6) {
					return `20%`;
				} else {
					return `150%`;
				}
			}}
	);
`;

const Clock = styled.div`
	width: 40dvw;
	height: 40dvw;
	display: flex;
	justify-content: center;
	align-items: center;
	color: white;
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
	/* font-size: ${(props) => props.$clocksize.height / 20}px; */
	font-size: 2rem;
	transition: transform 1s ease;

	@media (width < 768px) {
		font-size: 1rem;
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
	/* font-size: ${(props) => props.$clocksize.height / 20}px; */
	font-size: 2rem;
	transform: rotateZ(${(props) => props.$minutes * 6}deg);
	transition: transform 1s ease;

	@media (width < 768px) {
		font-size: 1rem;
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
	/* font-size: ${(props) => props.$clocksize.height / 40}px; */
	font-size: 1rem;
	transform: rotateZ(${(props) => props.$seconds * 6}deg);
	transition: transform 1s ease;

	& > * {
		margin-block: ${(props) => props.$clocksize.height / 70}px;
	}

	@media (width < 768px) {
		font-size: 0.5rem;
	}
`;

const Origin = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	display: flex;
	justify-content: center;
	align-items: center;
	width: 13.3%;
	height: 13.3%;
	z-index: 1;
	border-radius: 50%;
	/* font-size: ${(props) => props.$clocksize.height / 20}px; */
	font-size: 2rem;

	@media (width < 768px) {
		font-size: 1rem;
	}
`;

const Date = styled.div`
	position: absolute;
	bottom: 0;
	left: 50%;
	transform: translate(-50%);
`;

const CurCountry = styled.div`
	position: absolute;
	bottom: 20px;
	left: 50%;
	transform: translate(-50%);
`;

const CountryConatiner = styled.nav`
	overflow-y: auto;
	width: auto;

	/* Chrome */
	&::-webkit-scrollbar {
		display: none;
	}
	-ms-overflow-style: none; /* IE and Edge */
	scrollbar-width: none; /* Firefox */
`;

const Country = styled.button`
	background-color: transparent;
	width: 100%;
	border: none;
	display: flex;
	padding: 10px 0;
	color: white;
	transition: 0.3s;
	&:hover > span {
		background-color: rgba(20, 20, 20, 1);
	}
`;

const CountrySpan = styled.span`
	padding: 20px 20px 20px 0;
	transition: 0.3s;
	border-top-right-radius: 10px;
	border-bottom-right-radius: 10px;
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
	const [country, SetCountry] = useState("Asia/Seoul");
	const [date, setDate] = useState(moment().tz(country));
	const [clockSize, setClockSize] = useState({ width: 0, height: 0 });
	const clockRef = useRef(null);
	let countryArr = moment.tz.names();
	let hours = date.hours();
	let minutes = date.minutes();
	let seconds = date.seconds();

	useEffect(() => {
		const timerId = setInterval(() => {
			setDate(moment().tz(country));
		}, 100);

		return () => clearInterval(timerId);
	}, [country]);

	useEffect(() => {
		const clockReSize = () => {
			if (clockRef.current) {
				setClockSize({
					width: clockRef.current.offsetWidth,
					height: clockRef.current.offsetHeight,
				});
			}
		};
		clockReSize();
		window.addEventListener("resize", clockReSize);
		return () => window.removeEventListener("resize", clockReSize);
	}, []);

	const onClickCountry = (e) => {
		SetCountry(e.target.innerText);
	};

	return (
		<>
			<AppContainer $hours={hours}>
				<CountryConatiner>
					{countryArr.map((e, idx) => (
						<Country key={idx} onClick={onClickCountry}>
							<CountrySpan>{e}</CountrySpan>
						</Country>
					))}
				</CountryConatiner>
				<Clock ref={clockRef}>
					<Origin $clocksize={clockSize}>
						{hours >= 12 && hours < 24 ? "PM" : "AM"}
					</Origin>
					<HourHand $hours={hours} $minutes={minutes} $clocksize={clockSize}>
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
						</HoursHandText>{" "}
						<HoursHandText $hours={hours} $minutes={minutes}>
							{hours}
						</HoursHandText>
						<HoursHandText $hours={hours} $minutes={minutes}>
							{hours}
						</HoursHandText>
						<div>&nbsp;</div>
					</HourHand>
					<MinuteHand $minutes={minutes} $clocksize={clockSize}>
						<MinutesHandText $minutes={minutes}>{minutes}</MinutesHandText>
						<MinutesHandText $minutes={minutes}>{minutes}</MinutesHandText>
						<MinutesHandText $minutes={minutes}>{minutes}</MinutesHandText>
						<MinutesHandText $minutes={minutes}>{minutes}</MinutesHandText>
						<MinutesHandText $minutes={minutes}>{minutes}</MinutesHandText>
						<MinutesHandText $minutes={minutes}>{minutes}</MinutesHandText>
						<MinutesHandText $minutes={minutes}>{minutes}</MinutesHandText>{" "}
						<MinutesHandText $minutes={minutes}>{minutes}</MinutesHandText>
						<MinutesHandText $minutes={minutes}>{minutes}</MinutesHandText>
						<div>&nbsp;</div>
					</MinuteHand>
					<SecondHand $seconds={seconds} $clocksize={clockSize}>
						<SecondsHandText $clocksize={clockSize} $seconds={seconds}>
							{seconds}
						</SecondsHandText>
						<SecondsHandText $clocksize={clockSize} $seconds={seconds}>
							{seconds}
						</SecondsHandText>
						<SecondsHandText $clocksize={clockSize} $seconds={seconds}>
							{seconds}
						</SecondsHandText>
						<SecondsHandText $clocksize={clockSize} $seconds={seconds}>
							{seconds}
						</SecondsHandText>
						<SecondsHandText $clocksize={clockSize} $seconds={seconds}>
							{seconds}
						</SecondsHandText>
						<SecondsHandText $clocksize={clockSize} $seconds={seconds}>
							{seconds}
						</SecondsHandText>
						<SecondsHandText $clocksize={clockSize} $seconds={seconds}>
							{seconds}
						</SecondsHandText>
						<SecondsHandText $clocksize={clockSize} $seconds={seconds}>
							{seconds}
						</SecondsHandText>{" "}
						<SecondsHandText $clocksize={clockSize} $seconds={seconds}>
							{seconds}
						</SecondsHandText>
						<div>&nbsp;</div>
					</SecondHand>
				</Clock>
				<CurCountry>{country}</CurCountry>
				<Date>{date.format("YYYY-MM-DD")}</Date>
			</AppContainer>
		</>
	);
}

export default App;
