import React from "react";
import styled from "styled-components";

const MagicHero = styled.div`
  //   border: 1px solid black;
  display: flex;
  padding: 4rem;
  margin-bottom: 4rem;
`;

const HeroImage = styled.img`
  max-width: 520px;
  min-width: 520px;
  margin-right: 5rem;
`;

const HeroContent = styled.div`
  display: inline-block;
  //   border: 1px solid red;
  width: 500px;
  word-wrap: break-word;

  & > h1 {
    color: #f9c03f;
    // font-family: "Open Sans", sans-serif;
    font-weight: 800;
    font-size: 6rem;
    margin-bottom: 2rem;
  }

  & > h3 {
    color: #2e2e2e;
    font-family: "Montserrat", sans-serif;
    font-weight: 400;
    font-size: 3.6rem;
    line-height: 1.4;
  }

  & > h3 > span {
    font-family: "Montserrat", sans-serif;
    color: #f9c03f;
  }
`;

const ConfirmationPanel = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 3rem;
  width: 90%;
  // border: 1px solid red;
`;

const ConfirmationButton = styled.button`
  width: 12rem;
  height: 4rem;
  border-radius: 8px;
  font-size: 1.6rem;
  cursor: pointer;
`;

const AcceptConfirmationButton = styled(ConfirmationButton)`
  border: 1px solid #1fad1f;
  color: #1fad1f;

  &:hover {
    background-color: #1fad1f;
    color: white;
  }
`;

const RejectConfirmationButton = styled(ConfirmationButton)`
  border: 1px solid #cb2431;
  color: #cb2431;

  &:hover {
    background-color: #cb2431;
    color: white;
  }
`;

const MagicHeroComp = ({ ticket }) => {
  const renderSubtext = () => {
    if (ticket) {
      console.log(ticket.status);
      switch (ticket.status) {
        case "Await Your Reply":
          return (
            <h3>
              Your ticket has been seen by an admin and will receive a{" "}
              <span>reply soon</span>. We are hard at work processing your
              request!
            </h3>
          );
        case "Client Replied":
          return (
            <h3>
              Your latest reply has been received and your ticket will receive a{" "}
              <span>reply soon</span>. We are hard at work processing your
              request!
            </h3>
          );
        case "Admin Replied":
          return (
            <h3>
              An admin has <span>replied</span> to your ticket. You can scroll
              on down to see more details and continue the conversation.
            </h3>
          );
        case "Await Closure":
          return (
            <h3>
              We believe your ticket has been resolved and have
              <span> requested closure</span>. Please respond to it below.
              {/* <ConfirmationPanel>
                <AcceptConfirmationButton>Accept</AcceptConfirmationButton>
                <RejectConfirmationButton>Reject</RejectConfirmationButton>
              </ConfirmationPanel> */}
            </h3>
          );
        case "Closed":
          return (
            <h3>
              Your ticket has already been <span>closed</span>. We hope that the
              process has been a pleasant one for you!
            </h3>
          );
        default:
          return (
            <h3>
              Your ticket is currently still <span>unviewed</span>. Don't worry,
              our team will be on to it soon enough!
            </h3>
          );
      }
    }
  };
  return (
    <MagicHero>
      <HeroImage
        src={require("../assets/images/magic-hero.svg")}
        alt="hero image"
      />
      <HeroContent>
        <h1>Hello {ticket && ticket.requester}!</h1>
        {renderSubtext()}
      </HeroContent>
    </MagicHero>
  );
};

export default MagicHeroComp;
