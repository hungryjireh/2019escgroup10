import React from "react";
import TicketListItem from "./TicketListItem";
import "../style/TicketList.css";

const TicketList = ({ user, tickets }) => {
  const renderedTickets = tickets.map(ticket => {
    return <TicketListItem user={user} key={ticket.id} ticket={ticket} />;
  });

  return (
    <div className="ticketlist">
      <div className="ticketlist-header">
        <ul className="ticketlist-header-list">
          <li>Subject</li>
          <li>Status</li>
          <li>Requester</li>
          <li>Last Updated</li>
          <li>Group</li>
        </ul>
      </div>
      <div className="ticketlist-body">
        <ul className="ticketlist-body-list">{renderedTickets}</ul>
      </div>
    </div>
  );
};

export default {TicketList, renderedTickets};
