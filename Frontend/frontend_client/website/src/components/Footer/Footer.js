import React from "react";
import styled from "styled-components";
import FooterSection from "./FooterSection";

// REFACTOR START

const Footer = styled.div`
  width: 100%;
  background-color: #29292c;
  font-family: "Montserrat", sans-serif;
  padding: 10rem 17rem;

  //   @media (max-width: 1240px) {
  //     padding: 10rem 12rem;
  //   }

  @media (max-width: 1100px) {
    padding: 10rem 6rem;
  }

  @media (max-width: 610px) {
    padding: 10rem 4rem;
  }
`;

const FooterHeader = styled.h1`
  color: rgba(255, 255, 255, 0.7);
  font-size: 5.6rem;
  font-weight: 200;
  margin-bottom: 6rem;
  &::selection {
    background-color: #f9c03f;
    color: #2e2e2e;
  }

  //   @media (max-width: 1240px) {
  //     font-size: 4.2rem;
  //   }

  @media (max-width: 1100px) {
    font-size: 3rem;
  }

  @media (max-width: 610px) {
    font-size: 2.4rem;
  }
`;

const FooterSectionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;

  @media (max-width: 610px) {
    flex-direction: column;
  }
`;

// REFACTOR END

// const Footer = styled.div`
//   width: 100%;
//   background-color: #29292c;
//   font-family: "Montserrat", sans-serif;
//   padding: 10rem 17rem;
// `;

// const FooterHeader = styled.h1`
//   color: rgba(255, 255, 255, 0.7);
//   font-size: 5.6rem;
//   font-weight: 200;
//   margin-bottom: 6rem;
//   &::selection {
//     background-color: #f9c03f;
//     color: #2e2e2e;
//   }
// `;

// const FooterSectionWrapper = styled.div`
//   display: flex;
//   justify-content: space-between;
//   width: 80%;
// `;

const linksLearn = [
  { link: "https://beta.acnapi.io/#!/#about_us", text: "Our Assets" }
];
const linksCase = [
  {
    link: "http://blog.acnapi.io/2017/09/20/slow-to-code/",
    text: "Automate DevOps"
  },
  {
    link: "http://blog.acnapi.io/2017/04/24/a-transport-gap/",
    text: "Ride Platform"
  },
  {
    link: "http://blog.acnapi.io/2017/09/20/the-pesky-coupon/",
    text: "Smart Parking"
  }
];
const linksContact = [
  { link: "https://beta.acnapi.io/#!/", text: "Contact Us" },
  { link: "https://talent.acnapi.io/", text: "Join Our Team" }
];

const FooterComp = () => {
  return (
    <Footer>
      <FooterHeader>We'd love to work with you</FooterHeader>
      <FooterSectionWrapper>
        <FooterSection header="Learn" links={linksLearn} />
        <FooterSection header="Case Studies" links={linksCase} />
        <FooterSection header="Contact" links={linksContact} />
      </FooterSectionWrapper>
    </Footer>
  );
};

export default FooterComp;
