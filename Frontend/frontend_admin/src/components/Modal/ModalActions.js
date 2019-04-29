import React, { useState } from "react";
import styled from "styled-components";

import { db } from "../../firebase";

const ModalActions = styled.div`
  padding: 4rem;
`;

const ActionItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;

  & > label {
    color: #334e68;
    font-weight: 100;
    font-size: 1.6rem;
    padding: 0.5rem 0;
  }
`;

const ItemButton = styled.button`
  padding: 0.8rem;
  text-align: center;
  width: 16rem;
  font-size: 1.6rem;
  font-weight: 700;
  border-radius: 8px;
  background: none;
  cursor: pointer;
`;

const ClosureButton = styled(ItemButton)`
  border: 1px solid #2478cc;
  color: #2478cc;

  &:hover {
    background-color: #2478cc;
    color: #ffffff;
  }
`;

const DeleteButton = styled(ItemButton)`
  border: 1px solid #cb2431;
  color: #cb2431;

  &:hover {
    background-color: #cb2431;
    color: #ffffff;
  }
`;

const ConfirmationButton = styled.button`
  border: none;
  background: none;
  font-size: 1.6rem;
  margin-right: 3.5rem;
  cursor: pointer;
`;

const ModalActionsComp = ({ ticket }) => {
  const [confirmation, setConfirmation] = useState("");

  const handleClosureButtonClick = () => {
    setConfirmation("closure");
  };
  const handleDeleteButtonClick = () => {
    setConfirmation("delete");
  };

  const handleClosureConfirmationButtonClick = e => {
    if (e.target.innerText === "Yes") {
      db.doc(`tickets/${ticket.id}`)
        .update({
          status: "Await Closure"
        })
        .then(() => {
          setConfirmation("closure-request-sent");
        })
        .catch(err => {
          console.error("Error updating document: ", err);
        });
    } else {
    }
  };

  const handleDeleteConfirmationButtonClick = e => {
    if (e.target.innerText === "Yes") {
      db.doc(`tickets/${ticket.id}`)
        .delete()
        .then(() => {})
        .catch(err => {
          console.error("Error removing document: ", err);
        });
    } else {
    }
  };

  const renderConfirmation = () => {
    switch (confirmation) {
      case "closure":
        return (
          <ActionItem>
            <label htmlFor="closure-confirmation" style={{ color: "#2478cc" }}>
              Are you sure you want to request a closure for this ticket?
            </label>
            <span>
              <ConfirmationButton
                onClick={handleClosureConfirmationButtonClick}
                style={{ color: "#2478cc" }}
              >
                Yes
              </ConfirmationButton>
              <ConfirmationButton
                onClick={handleClosureConfirmationButtonClick}
                style={{ color: "#2478cc" }}
              >
                No
              </ConfirmationButton>
            </span>
          </ActionItem>
        );
      case "delete":
        return (
          <ActionItem>
            <label htmlFor="delete-confirmation" style={{ color: "#cb2431" }}>
              Are you sure you want to irreversibly delete this ticket?
            </label>
            <span>
              <ConfirmationButton
                onClick={handleDeleteConfirmationButtonClick}
                style={{ color: "#cb2431" }}
              >
                Yes
              </ConfirmationButton>
              <ConfirmationButton
                onClick={handleDeleteConfirmationButtonClick}
                style={{ color: "#cb2431" }}
              >
                No
              </ConfirmationButton>
            </span>
          </ActionItem>
        );
      case "closure-request-sent":
        return (
          <ActionItem>
            <label htmlFor="closure-request-sent" style={{ color: "#4ecc24" }}>
              Your request to close this ticket has been sent to the user!
            </label>
          </ActionItem>
        );
      default:
        break;
    }
  };
  return (
    <ModalActions>
      <ActionItem>
        <label htmlFor="closure">Request to close ticket</label>
        <ClosureButton onClick={handleClosureButtonClick}>
          Request
        </ClosureButton>
      </ActionItem>
      <ActionItem>
        <label htmlFor="closure">Delete ticket</label>
        <DeleteButton onClick={handleDeleteButtonClick}>Delete</DeleteButton>
      </ActionItem>
      {renderConfirmation()}
    </ModalActions>
  );
};

export default ModalActionsComp;
