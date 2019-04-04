import React from "react";
import styled from "styled-components";
import Nav from "./Nav";
import Hero from "./Hero/Hero";
import Explain from "./Explain/Explain";
import Footer from "./Footer/Footer";

import "./MainAnimations.css";

const Main = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;

  // @media (max-width: 440px) {
  //   border: 3px solid red;
  // }
`;

const MidBackground = styled.span`
  width: 1440px;
  height: 1200px;
  background-color: #2362f6;
  clip-path: polygon(0 17%, 100% 0, 100% 83%, 0% 100%);
  position: absolute;
  top: 20%;

  @media (max-width: 1100px) {
    top: 18%;
    height: 2400px;
  }

  @media (max-width: 730px) {
    top: 18%;
    height: 2200px;
  }

  @media (max-width: 440px) {
    top: 18%;
    height: 2000px;
  }
`;

const MainComp = () => {
  return (
    <Main>
      <Nav />
      <Hero />
      <MidBackground />
      {/* <img
        className="bricks"
        src={require("../assets/bricks.svg")}
        alt="bricks"
      />
      <img
        className="waving-arm wave-animation"
        src={require("../assets/waving-arm.svg")}
        alt="arm"
      /> */}
      <Explain />
      {/* <img
        className="hanging-robot swing-animation"
        src={require("../assets/hanging-robot-final.svg")}
        alt="robot"
      /> */}
      <img
        className="garden"
        src={require("../assets/garden-v3.svg")}
        alt="garden"
      />
      <Footer />
    </Main>
  );
};

export default MainComp;
