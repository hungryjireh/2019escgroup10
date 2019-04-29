import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import uuid from "uuid";
import parse from "date-fns/parse";

import ContentBot from "./ContentBot";
import ContentClient from "./ContentClient";
import { db } from "../../../firebase";

const host = "https://calm-falls-75658.herokuapp.com";
// const host = "http://localhost:5000";

function useAutoScroll(ref) {
  useEffect(() => {
    const node = ref.current;
    node.scrollTop = node.scrollHeight;
  });
}

const BotChatting = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ChattingHeader = styled.div`
  min-height: 14%;
  background: #3e76f9;
  border-radius: 8px 8px 0 0;
  padding: 1.6rem 3.2rem;

  & > span {
    float: right;
  }

  & > span > div {
    font-size: 1.9rem;
    color: white;
  }
`;

const ChattingContent = styled.div`
  height: 76%;
  overflow: auto;
  padding: 4rem;
`;

const ChattingForm = styled.form`
  height: 12%;
  width: 100%;
  position: relative;
  background-color: white;
  border-radius: 0 0 8px 8px;
`;

const FormChatbox = styled.textarea`
  height: 82%;
  width: 100%;
  border: none;
  background-color: white;
  padding: 1.4rem 2rem;
  font-size: 1.4rem;
  font-family: "Montserrat", sans-serif;
  resize: none;
  line-height: 1.6;

  &[required] {
    box-shadow: none;
  }
`;

const FormButton = styled.button`
  font-size: 1.4rem;
  border: none;
  display: inline-block;
  position: absolute;
  background: none;
  color: #aac0d5;
  cursor: pointer;
  bottom: 1rem;
  right: 1.6rem;
`;

function formatDate(date) {
  var monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return day + " " + monthNames[monthIndex] + " " + year;
}

const BotChattingComp = () => {
  // const [nowTime, setNowTime] = useState(new Date().toLocaleString());
  // useEffect(() => {
  //   setTimeout(() => {
  //     setNowTime(new Date().toLocaleString());
  //   }, 1000);
  // });

  // var date = format(new Date(), "MM/dd/yyyy");

  const scrollerRef = useRef();
  useAutoScroll(scrollerRef);

  const [chatflowID, setChatflowID] = useState(
    localStorage.getItem("chatflowID") || ""
  );

  const [chatflow, setChatflow] = useState({});
  const [textAreaValue, setTextAreaValue] = useState("");

  useEffect(() => {
    document.querySelector(".form-chatbox").addEventListener("focusin", () => {
      document.querySelector(".chatting-form").style.height = "40%";
      document.querySelector(
        ".chatting-content"
      ).scrollTop = document.querySelector(".chatting-content").scrollHeight;
    });

    document.querySelector(".form-chatbox").addEventListener("focusout", () => {
      document.querySelector(".chatting-form").style.height = "12%";
    });
  }, []);

  useEffect(() => {
    if (chatflowID) {
      db.doc(`chatflow/${chatflowID}`).onSnapshot(snapshot => {
        setChatflow({
          ...snapshot.data(),
          id: snapshot.id
        });
      });
    }
  }, [chatflowID]);

  const renderChatflow = () => {
    if (chatflowID && chatflow.messages) {
      const messages = chatflow.messages.map((message, index) => {
        if (
          !chatflow.messages[index - 1] ||
          message.source !== chatflow.messages[index - 1].source
        ) {
          return message.source === "bot" ? (
            <ContentBot header={true} message={message} />
          ) : (
            <ContentClient header={true} message={message} />
          );
        } else {
          return message.source === "bot" ? (
            <ContentBot header={false} message={message} />
          ) : (
            <ContentClient header={false} message={message} />
          );
        }
      });
      if (
        (new Date().getTime() -
          parse(localStorage.getItem("chatflowLastUpdate")).getTime()) /
          1000 >
        3600
      ) {
        messages.push(
          <ContentBot
            header={true}
            message={{
              source: "bot",
              submitTime: new Date(),
              content:
                "This conversation was cached for your convenience. If you would like to start a new conversation, type **'/restart'**. You can also type **'/shortcuts'** for other useful shortcuts."
            }}
          />
        );
        console.log(messages);
        return messages;
      } else {
        return messages;
      }
    } else {
      return (
        <div>
          <ContentBot
            header={true}
            message={{
              source: "bot",
              content: `Hello${
                localStorage.getItem("chatflowName")
                  ? " " + localStorage.getItem("chatflowName")
                  : ""
              }! My name is Botty. How may I help you today?`,
              submitTime: new Date()
            }}
          />
          <ContentBot
            header={false}
            message={{
              source: "bot",
              content: "For a list of shortcuts, type **'/shortcuts'** !",
              submitTime: new Date()
            }}
          />
        </div>
      );
    }
  };

  const handleFormSubmit = async e => {
    e.preventDefault();
    setTextAreaValue("");
    const value = e.target.elements[0].value;

    if (value === "/restart") {
      localStorage.setItem("chatflowLastUpdate", "");
      localStorage.setItem("chatflowID", "");
      setChatflowID("");
      return;
    }

    if (chatflowID) {
      localStorage.setItem("chatflowLastUpdate", new Date());
      await axios.post(`${host}/api/df_text_query`, {
        text: value,
        chatflowID,
        fromReact: true
      });
    } else {
      localStorage.setItem("chatflowLastUpdate", new Date());
      localStorage.setItem("chatflowID", uuid.v4());
      setChatflowID(localStorage.getItem("chatflowID"));
      await axios.post(`${host}/api/df_text_query`, {
        text: value,
        chatflowID: localStorage.getItem("chatflowID"),
        fromReact: true,
        chatflowName: localStorage.getItem("chatflowName")
      });
    }
  };

  return (
    <BotChatting>
      <ChattingHeader>
        <img
          src={require("../../../assets/head.svg")}
          alt="robot face"
          style={{
            width: "52px",
            background: "white",
            borderRadius: "50px",
            float: "left",
            margin: "auto"
          }}
        />
        <span style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: "1.2rem",
              color: "#e6e6e6",
              textTransform: "uppercase",
              marginBottom: "0.6rem"
            }}
          >
            {formatDate(new Date())}
          </div>
          <div>ACNAPI Botty</div>
        </span>
      </ChattingHeader>
      <ChattingContent className="chatting-content" ref={scrollerRef}>
        {renderChatflow()}
      </ChattingContent>
      <ChattingForm className="chatting-form" onSubmit={handleFormSubmit}>
        <FormChatbox
          className="form-chatbox"
          value={textAreaValue}
          type="text"
          required
          onChange={e => {
            setTextAreaValue(e.target.value);
          }}
        />
        <FormButton>Submit</FormButton>
      </ChattingForm>
    </BotChatting>
  );
};

export default BotChattingComp;
