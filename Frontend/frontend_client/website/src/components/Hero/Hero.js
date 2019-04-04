import React from "react";
import styled from "styled-components";
import Bot from "./Bot/Bot";
import HeroImage from "./HeroImage";

const HeroSection = styled.div`
  margin: auto;
  max-width: 1440px;

  background-color: hsl(0, 0%, 95%);
  padding: 11rem 2rem 6rem 2rem;
  display: flex;
  justify-content: center;

  @media (max-width: 1100px) {
    flex-direction: column-reverse;
    align-items: center;
  }
`;

const HeroComp = () => {
  return (
    <HeroSection>
      <Bot />
      <HeroImage />
    </HeroSection>
  );
};

export default HeroComp;
