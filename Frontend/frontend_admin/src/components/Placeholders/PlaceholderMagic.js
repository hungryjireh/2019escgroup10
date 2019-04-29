import React, { useState, useEffect } from "react";

import { db } from "../../firebase";
import history from "../../history";

const PlaceholderMagic = () => {
  const [ticket, setTicket] = useState({});
  useEffect(() => {
    var link = "";
    link = history.location.pathname.slice(17);

    console.log(link);
    db.doc(`tickets/${link}`).onSnapshot(snapshot => {
      setTicket({
        ...snapshot.data(),
        id: snapshot.id
      });
    });
  });

  return (
    <div>
      <h1>
        This is just a placeholder magic link. Anytime you return to this exact
        link you can get the ticket's live status.
      </h1>
      <br />
      <h1>
        Eventually this will be a link that will be sent to client's email after
        they submit a ticket, and they will also be able to participate in live
        chat with the admins from this link
      </h1>
      <br />
      <h1>Submission Details and Live Ticket Status:</h1>
      <br />
      <h2>Name: {ticket.requester}</h2>
      <h2>Email: {ticket.email}</h2>
      <h2>Group: {ticket.group}</h2>
      <h2 style={{ backgroundColor: "#fee29a" }}>Status: {ticket.status}</h2>
      <h2>Subject: {ticket.subject}</h2>
      <h2>Content: {ticket.content}</h2>
    </div>
  );
};

export default PlaceholderMagic;
