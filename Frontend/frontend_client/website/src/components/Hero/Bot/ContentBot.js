import React from "react";
import styled from "styled-components";
import showdown from "showdown";

const ContentBot = styled.div`
  font-size: 1.6rem;
  padding: 0 0 0 5rem;
  position: relative;
`;

export const BotFace = styled.img`
  width: 36px;
  display: inline-block;
  position: absolute;
  top: 5.4%;
  left: 0%;
  border-radius: 50px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.18);
`;

export const BotText = styled.p`
  display: inline-block;
  background-color: white;
  // max-width: 60%;
  padding: 1.4rem;
  border-radius: 0 12px 12px 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.18);
  line-height: 1.4;
  margin-bottom: 2rem;
  text-align: left;
  max-width: 100%;
  word-wrap: break-word;

  & a {
    text-decoration: underline;
    color: #1a0dab;
  }
`;

const ContentBotComp = ({ header, message }) => {
  var converter = new showdown.Converter();
  var htmlOutput = converter.makeHtml(message.content);
  console.log(htmlOutput);

  if (header) {
    return (
      <ContentBot>
        <BotFace src={require("../../../assets/head.svg")} alt="robot face" />
        <BotText dangerouslySetInnerHTML={{ __html: htmlOutput }} />
      </ContentBot>
    );
  } else {
    return (
      <ContentBot>
        <BotText dangerouslySetInnerHTML={{ __html: htmlOutput }} />
      </ContentBot>
    );
  }
};

export default ContentBotComp;
