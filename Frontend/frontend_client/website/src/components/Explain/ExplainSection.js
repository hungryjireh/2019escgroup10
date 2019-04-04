import React from "react";
import styled from "styled-components";

// REFACTOR START

const ExplainSection = styled.div`
  margin: 0 6rem;
  max-width: 300px;
  position: relative;
  text-align: center;

  @media (max-width: 1100px) {
    max-width: 100%;
    min-width: 300px;
    margin: 0 0 8rem 0;
  }
`;

const SectionNumber = styled.div`
  position: absolute;
  color: #facf6b;
  font-size: 10rem;
  top: -10%;
`;

const SectionImage = styled.img`
  width: 100%;
  margin-bottom: 4rem;

  @media (max-width: 1100px) {
    width: 50%;
  }
`;

const SectionText = styled.p`
  font-size: 1.6rem;
  line-height: 2;
  color: white;
  &::selection {
    background-color: #f9c03f;
  }
`;

// REFACTOR END

// const ExplainSection = styled.div`
//     width: 24%;
//     position: relative;
// `;

// const SectionNumber = styled.div`
//     position: absolute;
//     color: #facf6b;
//     font-size: 10rem;
//     top: -10%;
// `;

// const SectionImage = styled.img`
//     width: 100%;
//     margin-bottom: 4rem;
// `;

// const SectionText = styled.p`
//     font-size: 1.6rem;
//     line-height: 2;
//     color: white;
//     &::selection {
//         background-color: #f9c03f;
//     }
// `;

const ExplainSectionComp = props => {
  return (
    <ExplainSection>
      <SectionNumber>{props.num}</SectionNumber>
      <SectionImage src={props.src} alt={props.alt} />
      <SectionText>{props.text}</SectionText>
    </ExplainSection>
  );
};

export default ExplainSectionComp;
