import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { formatRelative } from "date-fns/esm";
import axios from "axios";

import { db } from "../firebase";

const MagicConvo = styled.div`
  padding: 4rem 4rem 8rem 4rem;
`;

const ConvoTitle = styled.h1`
  margin-left: 2rem;
  margin-bottom: 5rem;
  font-size: 3.2rem;
  font-weight: 900;
  color: #f9c03f;
`;

const ConvoArea = styled.form`
  margin-left: 2rem;
  margin-right: 2rem;
  //   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.18);
`;

const ConvoContent = styled.div`
  height: 500px;
  background-color: #f7f7f7;
  border: 0.5px solid #dde4ee;
  overflow: auto;
  display: flex;
  flex-direction: column;
  padding: 4rem 0;
`;

const ConvoChatbox = styled.div`
  height: 56%;
  //   border: 0.5px solid #dde4ee;
  border-radius: 8px;
  font-size: 1.4rem;
  resize: none;
  line-height: 1.6;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;

  // &:has(> textarea:focus) {
  //   border: 2px solid #7793bb;
  // }
`;

const ChatboxText = styled.textarea`
  width: 100%;
  height: 84%;
  padding: 2rem 2rem 1.2rem 2rem;
  border: none;
  font-size: 1.4rem;
  resize: none;
  line-height: 1.6;
  &:required {
    box-shadow: none;
  }
  &:invalid {
    box-shadow: none;
  }
`;

const ChatboxButtons = styled.div`
  height: 16%;
`;

const ConvoButton = styled.button`
  font-size: 1.4rem;
  border: none;
  display: inline-block;
  position: absolute;
  background: none;
  color: #aac0d5;
  cursor: pointer;
`;

const ContentOthers = styled.div`
  margin-left: 4rem;
  text-align: left;
  & > div > h1 {
    display: inline;
    font-size: 1.6rem;
    font-weight: bold;
    color: #334e68;
    margin-right: 1rem;
  }

  & > div > span {
    font-size: 1.2rem;
    font-weight: normal;
    color: #aac0d5;
  }

  & > p {
    margin-top: 1.6rem;
    display: inline-block;
    background-color: #f5f7fa;
    font-size: 1.6rem;
    max-width: 60%;
    padding: 1.4rem;
    border-radius: 0 12px 12px 12px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
    line-height: 1.4;
    margin-bottom: 2rem;
  }
`;

const ContentYou = styled.div`
  margin-right: 4rem;
  text-align: right;
  & > div > h1 {
    display: inline;
    font-size: 1.6rem;
    font-weight: bold;
    color: #334e68;
    margin-right: 1rem;
  }

  & > div > span {
    font-size: 1.2rem;
    font-weight: normal;
    color: #aac0d5;
  }

  & > p {
    margin-top: 1.6rem;
    display: inline-block;
    background-color: #f5f7fa;
    font-size: 1.6rem;
    max-width: 60%;
    padding: 1.4rem;
    border-radius: 12px 12px 0 12px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
    line-height: 1.4;
    margin-bottom: 2rem;
  }
`;

const MagicConvoComp = ({ ticket }) => {
  console.log(ticket);
  // const conversations = useCollection(
  //   `tickets/${ticket.id}/conversations`,
  //   "submitTime"
  // );

  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    return db
      .collection(`tickets/${ticket.id}/conversations`)
      .orderBy("submitTime")
      .onSnapshot(snapshot => {
        const items = [];
        snapshot.forEach(item => {
          items.push({
            ...item.data(),
            id: item.id
          });
        });

        setConversations(items);
      });
  }, [ticket]);

  const handleModalConvoSubmit = e => {
    e.preventDefault();
    const submitTime = new Date();
    db.collection(`tickets/${ticket.id}/conversations`).add({
      content: e.target.elements[0].value,
      submitTime: submitTime,
      user: {
        name: ticket.requester,
        id: "none",
        position: "client"
      }
    });
    db.collection("updates").add({
      type: "client-update",
      userID: "none",
      requester: ticket.requester,
      subject: ticket.subject,
      group: ticket.group,
      content: e.target.elements[0].value,
      updatedTime: submitTime
    });
    axios.post("https://calm-falls-75658.herokuapp.com/api/push-update", {
      data: {
        title: "Ticket Reply by Client",
        requester: ticket.requester,
        type: "client-update",
        group: ticket.group
      },
      topic: "client-update"
    });
    e.target.elements[0].value = "";
  };

  const renderContent = conversations => {
    if (conversations.length > 0) {
      return conversations.map(convo => {
        const notYou = convo.user.position === "admin";

        return notYou ? (
          <ContentOthers key={convo.id}>
            <div>
              <h1>
                {convo.user.position === "admin" ? "Admin" : "Client"}{" "}
                {convo.user.name}
              </h1>
              <span style={{ textTransform: "capitalize" }}>
                {" "}
                {formatRelative(convo.submitTime.toDate(), new Date())}
              </span>
            </div>
            <p>{convo.content}</p>
          </ContentOthers>
        ) : (
          <ContentYou key={convo.id}>
            <div>
              <h1>You</h1>
              <span style={{ textTransform: "capitalize" }}>
                {" "}
                {formatRelative(convo.submitTime.toDate(), new Date())}
              </span>
            </div>
            <p>{convo.content}</p>
          </ContentYou>
        );
      });
    }
  };

  return (
    <MagicConvo>
      <ConvoTitle>Conversations</ConvoTitle>
      <ConvoArea onSubmit={handleModalConvoSubmit}>
        <ConvoContent>{renderContent(conversations)}</ConvoContent>
        <ConvoChatbox id="chatbox">
          <ChatboxText required />
          <ChatboxButtons>
            <ConvoButton style={{ bottom: "-102%", right: "16.6%" }}>
              Send
            </ConvoButton>
          </ChatboxButtons>
        </ConvoChatbox>
      </ConvoArea>
    </MagicConvo>
  );
};

export default MagicConvoComp;
