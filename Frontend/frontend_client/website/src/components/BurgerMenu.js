import React from "react";
import styled from "styled-components";

import useLockBodyScroll from "./useLockBodyScroll";
import "./BurgerMenuAnimations.css";

const BurgerMenu = styled.div`
  width: 230px;
  height: 100vh;
  position: fixed;
  left: 0;
  padding: 2rem 3rem;
  display: flex;
  flex-direction: column;
  font-family: "Montserrat", sans-serif;
  background-color: white;
  z-index: 5;
`;

export const Darken = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  background-color: rgb(0, 0, 0);
  opacity: 0.4;
  z-index: 4;
  transition
`;

export const BurgerLink = styled.a`
  font-size: 1.4rem;
  margin-bottom: 3rem;
`;

const BurgerMenuComp = ({ setHasBurgerFalse }) => {
  useLockBodyScroll();
  return (
    <div>
      <BurgerMenu className="slide-in-animation">
        <BurgerLink href="https://beta.acnapi.io">Home</BurgerLink>
        <BurgerLink href="https://beta.acnapi.io/#!/#about_us">About Us</BurgerLink>
        <BurgerLink href="https://beta.acnapi.io/#!/#assets">Our Assets</BurgerLink>
        <BurgerLink href="https://beta.acnapi.io/#!/#case_study">Case Studies</BurgerLink>
        <BurgerLink href="https://beta.acnapi.io/#!/">Contact Us</BurgerLink>
      </BurgerMenu>
      <Darken
        className="darken-animation"
        onClick={() => {
          document
            .querySelector(".slide-in-animation")
            .classList.toggle("slide-out-animation");
          document
            .querySelector(".darken-animation")
            .classList.toggle("lighten-animation");
          setTimeout(() => {
            setHasBurgerFalse();
          }, 400);
        }}
      />
    </div>
  );
};

export default BurgerMenuComp;
