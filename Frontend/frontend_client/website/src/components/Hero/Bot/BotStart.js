import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";

import "./BotRecaptcha.css";

const BotStart = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BlueHead = styled.div`
  width: 100%;
  height: 24%;
  background-color: #3e76f9;
  border-radius: 8px 8px 0 0;
  margin-bottom: 12rem;
`;

const BotImage = styled.img`
  width: 40%;
  position: absolute;
  top: 10%;
  left: 30%;
  background: white;
  padding: 2rem;
  border-radius: 100px;
`;

const BotFormOne = styled.input`
  width: 30.1rem;
  height: 4rem;
  background: #f9f9f9;
  border-radius: 2px;
  border: 1px solid #cccccc;
  box-shadow: 0 1px 1px 0px rgba(140, 140, 140, 0.2);
  font-size: 1.6rem;
  padding: 1rem;
  color: #d9d9d9;
  margin-bottom: 2rem;

  &:focus {
    border: 2px solid #3e76f9;
    color: #000000;
  }

  @media (max-width: 380px) {
    margin-bottom: 1rem;
    width: 22.8rem;
  }
`;

const BotButton = styled(Link)`
  width: 30.1rem;
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
  cursor: pointer;

  @media (max-width: 380px) {
    width: 22.8rem;
  }
`;

const UnverifiedBotButton = styled(BotButton)`
  cursor: not-allowed;
  background: linear-gradient(to right, #666666 40%, #8c8c8c 100%) no-repeat 50%
    50% / 100% 100%;
`;

const host = "https://calm-falls-75658.herokuapp.com";
// const host = "http://localhost:5000";

const BotStartComp = () => {
  const [nameFieldValue, setNameFieldValue] = useState("What's your name?");
  const [isVerified, setIsVerified] = useState(false);
  const handleRecaptcha = async t => {
    const outcome = await axios.post(`${host}/api/verification`, {
      token: t
    });

    switch (outcome.data) {
      case "G-recaptcha verification 1":
        setIsVerified(true);
        break;
      case "G-recaptcha verification 0":
        console.log("Verification failed!");
        break;
      default:
        break;
    }
  };
  const handleRecaptchaExpiry = () => {
    setIsVerified(false);
  };

  window.handleRecaptchaExpiry = handleRecaptchaExpiry;
  window.handleRecaptcha = handleRecaptcha;

  return (
    <BotStart>
      <BlueHead />
      <BotImage src={require("../../../assets/head.svg")} alt="robot head" />
      <BotFormOne
        className="bot-name-field"
        type="text"
        value={nameFieldValue}
        onChange={e => {
          setNameFieldValue(e.target.value);
        }}
        onFocus={e => {
          if (e.target.value === "What's your name?") {
            setNameFieldValue("");
          }
        }}
      />
      <div
        class="g-recaptcha"
        style={{
          marginBottom: "5rem"
        }}
        data-sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
        // data-size="compact"
        data-callback="handleRecaptcha"
        data-expired-callback="handleRecaptchaExpiry"
      />
      {isVerified &&
      nameFieldValue !== "What's your name?" &&
      nameFieldValue.length > 0 ? (
        <BotButton
          to="/botchatting"
          onClick={() => {
            localStorage.setItem("chatflowName", nameFieldValue);
          }}
        >
          Start Chatting
        </BotButton>
      ) : (
        <UnverifiedBotButton to="#">Please Verify First</UnverifiedBotButton>
      )}
    </BotStart>
  );
};

export default BotStartComp;
