import React from "react";
import styled from "styled-components";
import { formatRelative } from "date-fns/esm";

const ModalInfo = styled.div`
  width: 100%;
  height: 89%;
  padding: 4rem;
`;

const InfoContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 2fr 6fr;
  grid-template-areas:
    "name name email phone"
    "group status update-time submit-time"
    "subject subject subject subject"
    "content content content media";
  width: 100%;
  height: 100%;
  border-top: 0.5px solid #dde4ee;
  border-left: 0.5px solid #dde4ee;
`;

const InfoBlock = styled.div`
  border-right: 0.5px solid #dde4ee;
  border-bottom: 0.5px solid #dde4ee;
  padding: 2rem;

  & > h1 {
    text-transform: uppercase;
    font-size: 1.2rem;
    font-weight: normal;
    color: #aac0d5;
    margin-bottom: 1rem;
  }

  & > p {
    font-size: 1.4rem;
    font-weight: bold;
    color: #334e68;
    line-height: 1.6;
  }
`;

const ModalInfoComp = ({ ticket }) => {
  return (
    <ModalInfo>
      <InfoContainer>
        <InfoBlock style={{ gridArea: "name" }}>
          <h1>Name</h1>
          <p>{ticket.requester}</p>
        </InfoBlock>
        <InfoBlock style={{ gridArea: "email" }}>
          <h1>Email</h1>
          <p>{ticket.email}</p>
        </InfoBlock>
        <InfoBlock style={{ gridArea: "phone" }}>
          <h1>Phone Number</h1>
          <p>{ticket.email}</p>
        </InfoBlock>
        <InfoBlock style={{ gridArea: "group" }}>
          <h1>Group</h1>
          <p>{ticket.group}</p>
        </InfoBlock>
        <InfoBlock style={{ gridArea: "status" }}>
          <h1>Status</h1>
          <p>{ticket.status}</p>
        </InfoBlock>
        <InfoBlock style={{ gridArea: "update-time" }}>
          <h1>Last Updated</h1>
          <p style={{ textTransform: "capitalize" }}>
            {formatRelative(ticket.lastUpdatedTime.toDate(), new Date())}
          </p>
        </InfoBlock>
        <InfoBlock style={{ gridArea: "submit-time" }}>
          <h1>Submitted On</h1>
          <p style={{ textTransform: "capitalize" }}>
            {formatRelative(ticket.submitTime.toDate(), new Date())}
          </p>
        </InfoBlock>
        <InfoBlock style={{ gridArea: "subject" }}>
          <h1>Subject</h1>
          <p>{ticket.subject}</p>
        </InfoBlock>
        <InfoBlock style={{ gridArea: "content", overflow: "scroll" }}>
          <h1>Content</h1>
          <p>{ticket.content}</p>
        </InfoBlock>
        <InfoBlock style={{ gridArea: "media" }}>
          <h1>Uploaded Images</h1>
          <p>Feature not available yet</p>
        </InfoBlock>
      </InfoContainer>
    </ModalInfo>
  );
};

export default ModalInfoComp;
