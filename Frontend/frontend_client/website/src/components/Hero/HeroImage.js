import React from "react";
import styled from "styled-components";
import "./HeroImage.css";

// REFACTOR START

const HeroImageWrapper = styled.div`
  min-width: 660px;
  @media (max-width: 1100px) {
    margin-bottom: 4rem;
    min-width: calc(60% - 4rem);
    max-width: calc(100% - 4rem);
  }

  z-index: 1;
  position: relative;
  font-family: "Open Sans", sans-serif;
`;

const HeroImage = styled.img`
  position: relative;
  z-index: 1;
  @media (max-width: 1100px) {
    display: none;
  }
`;

const HeroImageMobile = styled.img`
  display: none;
  @media (max-width: 1100px) {
    display: inline;
    height: 400px;
    position: absolute;
    transform: rotate(-42deg);
    right: -22%;
    z-index: -1;
    opacity: 0.6;
  }

  @media (max-width: 610px) {
    right: -40%;
  }

  @media (max-width: 440px) {
    right: -60%;
  }

  @media (max-width: 380px) {
    right: -78%;
  }
`;

const ImageHeader = styled.h1`
  color: hsl(0, 0%, 18%);
  line-height: 1;
  font-weight: 800;
  font-style: italic;
  text-align: center;
  font-size: 5.6rem;
  position: absolute;
  left: 10%;
  top: 6%;
  z-index: 1;
  &::selection {
    background-color: #f9c03f;
  }

  @media (max-width: 1100px) {
    display: none;
  }
`;

const ImageSubtext = styled.h2`
  color: hsl(0, 0%, 18%);
  font-weight: 900;
  text-align: center;
  left: 30%;

  &::selection {
    background-color: #f9c03f;
  }

  @media (min-width: 1100px) {
    font-style: italic;
    font-size: 4.6rem;
    position: absolute;
    bottom: 1.5%;
  }

  @media (max-width: 1100px) {
    left: 0;
    margin-top: 5rem;
    margin-bottom: 2rem;
    font-size: 9.2rem;
    & > span {
      font-style: italic;
    }
  }

  @media (max-width: 610px) {
    font-size: 6rem;
  }

  @media (max-width: 440px) {
    font-size: 4.6rem;
  }
`;

const TelegramSubtext = styled.div`
  display: none;

  @media (max-width: 1100px) {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-family: "Montserrat", sans-serif;
    font-size: 1.6rem;
    font-weight: 400;
    color: #8993a4;

    & > a {
      margin: 0 0 0 1.2rem;
    }

    & > a > img {
      width: 30px;
    }
  }
`;

const TextHighlight = styled.span`
  color: #f9c03f;
  &::selection {
    background-color: #f9c03f;
    color: #f2f2f2;
  }
`;

// REFACTOR END

// const HeroImageWrapper = styled.div`
//     position: relative;
//     font-family: "Open Sans", sans-serif;
//     width: 69%;
//     z-index: 1;
//     left: 2rem;
// `;

// const HeroImage = styled.img`
//     width: 650px;
//     position: relative;
//     bottom: -10%;
// `;

// const ImageHeader = styled.h1`
//     color: hsl(0, 0%, 18%);
//     font-size: 5.6rem;
//     font-weight: 900;
//     font-style: italic;
//     position: absolute;
//     left: 10%;
//     top: 4%;
//     &::selection {
//         background-color: #f9c03f;
//     }
// `;

// const ImageSubtext = styled.h2`
//     color: hsl(0, 0%, 18%);
//     font-size: 4.6rem;
//     font-weight: 900;
//     font-style: italic;
//     position: absolute;
//     left: 39%;
//     bottom: 1.5%;
//     &::selection {
//         background-color: #f9c03f;
//     }
// `;

// const TextHighlight = styled.span`
//     color: #f9c03f;
//     &::selection {
//         background-color: #f9c03f;
//         color: #f2f2f2;
//     }
// `;

const HeroImageComp = () => {
  return (
    <HeroImageWrapper>
      <img
        className="bricks"
        src={require("../../assets/bricks.svg")}
        alt="bricks"
      />
      <img
        className="waving-arm wave-animation"
        src={require("../../assets/waving-arm.svg")}
        alt="arm"
      />
      <HeroImage
        src={require("../../assets/undraw_artificial_intelligence_upfn_edited.svg")}
        alt="hero image robot"
      />
      <HeroImageMobile
        src={require("../../assets/mobile-size-botty-left-static.svg")}
        alt="hero image robot"
      />
      {/* <img
        className="mobile-waving-arm mobile-wave-animation"
        src={require("../../assets/mobile-waving-arm.svg")}
        alt="arm"
      /> */}
      <ImageHeader>
        <TextHighlight>Chat</TextHighlight> With Us Now.
      </ImageHeader>
      <ImageSubtext>
        Say <TextHighlight>Hello</TextHighlight> to Botty!
      </ImageSubtext>
      <TelegramSubtext>
        Also available on:
        <a href="https://telegram.me/acnapibotty_bot">
          <img src={require("../../assets/telegram.svg")} alt="telegram" />
        </a>
      </TelegramSubtext>
    </HeroImageWrapper>
  );
};

export default HeroImageComp;
