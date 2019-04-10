import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const BotStart = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

export const BlueHead = styled.div`
  width: 100%;
  height: 24%;
  background-color: #3e76f9;
  border-radius: 8px 8px 0 0;
`;

export const BotImage = styled.img`
  width: 40%;
  position: absolute;
  top: 10%;
  left: 30%;
  background: white;
  padding: 2rem;
  border-radius: 100px;
`;

export const BotFormOne = styled.input`
  width: 60%;
  height: 8%;
  background: white;
  border-radius: 8px;
  border: 0.5px solid black;
  position: absolute;
  bottom: 44%;
  left: 20%;
  font-size: 1.6rem;
  padding: 1rem;
  color: #d9d9d9;

  &:focus {
    border: 2px solid #3e76f9;
  }
`;

export const BotFormTwo = styled.input`
  width: 60%;
  height: 8%;
  background: white;
  border-radius: 8px;
  border: 0.5px solid black;
  position: absolute;
  bottom: 32%;
  left: 20%;
  font-size: 1.6rem;
  padding: 1rem;
  color: #d9d9d9;

  &:focus {
    border: 2px solid #3e76f9;
  }
`;

export const BotButton = styled(Link)`
  font-size: 1.2rem;
  border: none;
  background: white;
  padding: 1.2rem 3rem;
  border-radius: 8px;
  background: linear-gradient(to right, #0840c4 40%, #2362f6 100%) no-repeat 50%
    50% / 100% 100%;
  color: hsl(0, 0%, 97%);
  text-transform: uppercase;
  box-shadow: 0 20px 10px rgba(0, 0, 0, 0.12);
  position: absolute;
  left: 20%;
  bottom: 16%;
  width: 60%;
  cursor: pointer;
`;

const BotStartComp = () => {
  return (
    <BotStart>
      <BlueHead />
      <BotImage src={require("../../../assets/head.svg")} alt="robot head" />
      <BotFormOne value="Name" />
      <BotFormTwo value="Email" />
      <BotButton to="/botchatting">Start Chatting</BotButton>
    </BotStart>
  );
};

export default BotStartComp;
