import React from "react";
import styled from "styled-components";

const ContentClient = styled.div`
  font-size: 1.6rem;
  padding: 0 5rem 0 0;
  position: relative;
`;

export const ClientFace = styled.img`
  width: 36px;
  display: inline-block;
  position: absolute;
  top: 5.4%;
  right: 0%;
  border-radius: 50px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.18);
`;

export const ClientText = styled.p`
  display: inline-block;
  background-color: white;
  padding: 1.4rem;
  border-radius: 12px 12px 0 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.18);
  line-height: 1.4;
  margin-bottom: 2rem;
  text-align: left;
  max-width: 100%;
  word-wrap: break-word;
`;

const ContentClientComp = ({ header, message }) => {
  if (header) {
    return (
      <ContentClient>
        <ClientFace
          src={require("../../../assets/human-head.svg")}
          alt="client face"
        />
        <ClientText>{message.content}</ClientText>
      </ContentClient>
    );
  } else {
    return (
      <ContentClient>
        <ClientText>{message.content}</ClientText>
      </ContentClient>
    );
  }
};

export default ContentClientComp;
