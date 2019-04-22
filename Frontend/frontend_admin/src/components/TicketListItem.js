import React, { useState, useEffect } from "react";
import "../style/TicketListItem.css";
import { formatRelative } from "date-fns/esm";

import ReactDOM from "react-dom";
import Modal from "../Modal/Modal";
import { db } from "../firebase";

const subjectTruncate = subjString => {
  if (subjString) {
    if (subjString.length > 55) {
      return subjString.slice(0, 50) + "...";
    } else {
      return subjString;
    }
  }
};

const TicketListItem = ({ user, ticket, highlight }) => {
  const [hasModal, setHasModal] = useState(false);

  // useEffect(() => {
  //   if (ticket.status === "Unviewed") {
  //     console.log("I am unviewed!");
  //     document.querySelector(".ticketlistitem").style.backgroundColor =
  //       "#fee29a";
  //     console.log(document.querySelector(".ticketlistitem").classList);
  //   } else {
  //     document
  //       .querySelector(".ticketlistitem")
  //       .classList.remove("unviewed-ticket");
  //   }
  // }, [ticket.status]);

  const setHasModalFalse = () => {
    setHasModal(false);
  };

  const changeStatus = e => {
    if (ticket.status === "Unviewed") {
      db.doc(`tickets/${ticket.id}`).update({
        status: "Await Your Reply",
        statusInt: 1
      });
    }
  };

  return (
    <div>
      <div
        onClick={e => {
          setHasModal(true);
          changeStatus(e);
        }}
        className={"ticketlistitem " + highlight + "-bg"}
      >
        <ul className="ticketlistitem-list">
          <li>{subjectTruncate(ticket.subject)}</li>
          <li>{ticket.status}</li>
          <li>{ticket.requester}</li>
          <li style={{ textTransform: "capitalize" }}>
            {formatRelative(ticket.lastUpdatedTime.toDate(), new Date())}
          </li>
          <li>{ticket.group}</li>
        </ul>
      </div>
      <div>
        {hasModal &&
          ReactDOM.createPortal(
            <Modal
              user={user}
              ticket={ticket}
              setHasModalFalse={setHasModalFalse}
            />,
            document.querySelector("#modal")
          )}
      </div>
    </div>
  );
};

export default TicketListItem;
