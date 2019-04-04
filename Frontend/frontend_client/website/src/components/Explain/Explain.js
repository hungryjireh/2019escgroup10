import React from "react";
import styled from "styled-components";
import ExplainSection from "./ExplainSection";

// REFACTOR START

const Explain = styled.div`
  margin: auto;
  max-width: 1440px;
  font-family: "Montserrat", sans-serif;
  padding: 6rem 2rem 0rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin-bottom: 20rem;

  @media (max-width: 1100px) {
    padding: 6rem 4rem 0rem 4rem;
  }
`;

const ExplainHeader = styled.h1`
  font-size: 5.6rem;
  color: #f9c03f;
  font-family: "Open Sans", sans-serif;
  margin-bottom: 8rem;
  &::selection {
    background-color: #f9c03f;
    color: #f2f2f2;
  }
`;

const ExplainSectionWrapper = styled.div`
  max-width: 1440px;
  display: flex;
  justify-content: space-between;

  @media (max-width: 1100px) {
    flex-direction: column;
    align-items: center;
  }
`;

// REFACTOR END

// const Explain = styled.div`
//     font-family: "Montserrat", sans-serif;
//     padding: 6rem 18rem 0rem 18rem;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     position: relative;
//     margin-bottom: 40rem;
// `;

// const ExplainHeader = styled.h1`
//     font-size: 5.6rem;
//     color: #f9c03f;
//     font-family: "Open Sans", sans-serif;
//     margin-bottom: 8rem;
//     &::selection {
//         background-color: #f9c03f;
//         color: #f2f2f2;
//     }
// `;

// const ExplainSectionWrapper = styled.div`
//     display: flex;
//     justify-content: space-between;
// `;

const ExplainComp = () => {
  const sectionsList = [
    {
      alt: "question picture",
      text:
        "Having trouble with an API, want to try out our products, or maybe you just want to have a chat? Fret not, Botty is here to help. He will answer your questions as best as he can!"
    },
    {
      alt: "working picture",
      text:
        "Your issues not resolved by Botty? Don't worry, you can send a ticket to one of our human administrators via Botty! We will then send you a magic link to track your ticket status."
    },
    {
      alt: "celebration picture",
      text:
        "We will get back to your ticket as efficiently and professionally as possible. It's a promise from us! Yay, problem solved!"
    }
  ];
  const sections = sectionsList.map(({ image, alt, text }) => {
    console.log(image);
    return (
      <ExplainSection
        src={require("../../assets/question.svg")}
        alt={alt}
        text={text}
      />
    );
  });
  return (
    <Explain>
      <ExplainHeader>How Does it Work?</ExplainHeader>
      <ExplainSectionWrapper>
        <ExplainSection
          className="explain-section"
          src={require("../../assets/question-yellow-fixed.svg")}
          alt="question picture"
          num="1"
          text="Having trouble with an API, want to try out our products, or maybe you just want to chat? Fret not, Botty is here to help!"
        />
        <ExplainSection
          className="explain-section"
          src={require("../../assets/working-yellow.svg")}
          alt="working picture"
          num="2"
          text="Your issues not resolved by Botty? Don't worry, you can send a ticket to one of our human administrators via Botty!"
        />
        <ExplainSection
          src={require("../../assets/celebration-yellow.svg")}
          alt="celebration picture"
          num="3"
          text="We will get back to your ticket as efficiently and professionally as possible. It's a promise from us! Yay, problem solved!"
        />
      </ExplainSectionWrapper>
    </Explain>
  );
};

export default ExplainComp;
