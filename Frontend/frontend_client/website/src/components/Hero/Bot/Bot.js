import React from "react";
import styled from "styled-components";
import { MemoryRouter, Route } from "react-router-dom";

import BotStart from "./BotStart";
import BotChatting from "./BotChatting";

// REFACTOR START

const Bot = styled.div`
  min-width: 430px;
  max-width: 430px;
  height: 570px;
  background-color: hsl(0, 0%, 97%);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.18);
  margin-right: 10rem;
  font-family: "Montserrat", sans-serif;
  position: relative;
  text-align: center;
  z-index: 2;

  @media (max-width: 1240px) {
    margin-right: 3rem;
  }

  @media (max-width: 1100px) {
    margin-right: 0rem;
    // min-width: 320px;
  }

  @media (max-width: 380px) {
    min-width: 320px;
    max-width: 320px;
  }
`;

// REFACTOR END

// const Bot = styled.div`
//     width: 40%;
//     height: 570px;
//     background-color: hsl(0, 0%, 97%);
//     border-radius: 8px;
//     box-shadow: 0 2px 4px rgba(0, 0, 0, 0.18);
//     margin-right: 10rem;
//     font-family: "Montserrat", sans-serif;
//     position: relative;
//     text-align: center;
//     z-index: 1;
// `;

const BotComp = () => {
  return (
    <Bot>
      <MemoryRouter style={{ width: "100%", height: "100%" }}>
        <div style={{ width: "100%", height: "100%" }}>
          {localStorage.getItem("chatflowID") ? (
            <Route path="/" component={BotChatting} />
          ) : (
            <div style={{ width: "100%", height: "100%" }}>
              <Route path="/" exact component={BotStart} />
              <Route path="/botchatting" component={BotChatting} />
            </div>
          )}
        </div>
      </MemoryRouter>
    </Bot>
  );
};

export default BotComp;
