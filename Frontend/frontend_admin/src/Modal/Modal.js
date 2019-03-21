import React, { useState } from "react";
import styled from "styled-components";

import ModalInfo from "./ModalInfo";
import ModalConvo from "./ModalConvo";
import useLockBodyScroll from "./useLockBodyScroll";

const Modal = styled.div`
  position: fixed;
  background: white;
  width: 60vw;
  height: 90vh;
  left: 20%;
  top: 5%;
  z-index: 5;
  border-radius: 2px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const Blacken = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  z-index: 4;
`;

const ModalHead = styled.div`
  background: #f5f7fa;
  border-bottom: 0.5px solid #dde4ee;
  & > button {
    border: none;
    background: #f5f7fa;
    color: #aac0d5;
    font-size: 1.6rem;
    margin-left: 4rem;
    padding: 2.6rem 0;
    font-weight: bold;
    cursor: pointer;
  }

  & > button.active {
    border-bottom: 2px solid #febc12;
    color: #334e68;
  }

  & > span {
    position: absolute;
    font-size: 3.4rem;
    color: #334e68;
    right: 3.4rem;
    top: 1.8rem;
    cursor: pointer;
  }
`;

const ModalComp = ({ user, ticket, setHasModalFalse }) => {
  useLockBodyScroll();
  const [view, setView] = useState("Information");

  const handleHeadButtonClick = e => {
    if (e.target.className.includes("info") && view === "Conversation") {
      e.target.classList.toggle("active");
      document.querySelector(".convo").classList.toggle("active");
      setView("Information");
    } else if (e.target.className.includes("convo") && view === "Information") {
      e.target.classList.toggle("active");
      document.querySelector(".info").classList.toggle("active");
      setView("Conversation");
    }
  };

  return (
    <div>
      <Blacken onClick={setHasModalFalse} />
      <Modal>
        <ModalHead>
          <button onClick={handleHeadButtonClick} className="info active">
            Information
          </button>
          <button onClick={handleHeadButtonClick} className="convo">
            Conversation
          </button>
          <span onClick={setHasModalFalse}>&#10006;</span>
        </ModalHead>
        {view === "Information" && <ModalInfo ticket={ticket} />}
        {view === "Conversation" && <ModalConvo user={user} ticket={ticket} />}
      </Modal>
    </div>
  );
};

export default ModalComp;
