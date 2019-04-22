import React from "react";
import TicketListItem from "./TicketListItem";
import "../style/TicketList.css";

const TicketList = ({ user, tickets }) => {
  let criteria = [];
  let priorityTickets = [];
  let highlight = [];

  if (user) {
    for (let i = 0; i < user.config.priorities.length; i++) {
      criteria.push(user.config.priorities[i].criteria);
      priorityTickets.push([]);
      highlight.push(user.config.priorities[i].highlight);
    }
  }

  const noPriorityTickets = tickets.flatMap(ticket => {
    for (let i = 0; i < criteria.length; i++) {
      if (!user.config.groups.includes(ticket.group)) {
        return [];
      } else if (
        ticket.status === criteria[i] ||
        ticket.group === criteria[i]
      ) {
        priorityTickets[i].push(ticket);
        return [];
      }
    }
    return ticket;
  });

  const renderPriorityTickets = priorityTickets.flatMap(
    (priorityGroup, index) => {
      return priorityGroup.map(ticket => {
        return (
          <TicketListItem
            user={user}
            key={ticket.id}
            ticket={ticket}
            highlight={highlight[index]}
          />
        );
      });
    }
  );

  const renderNoPriorityTickets = noPriorityTickets.map(ticket => {
    return (
      <TicketListItem
        user={user}
        key={ticket.id}
        ticket={ticket}
        highlight={"none"}
      />
    );
  });

  // const renderedTickets = tickets.map(ticket => {
  //   return <TicketListItem user={user} key={ticket.id} ticket={ticket} />;
  // });

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
        <ul className="ticketlist-body-list">
          {user && renderPriorityTickets.concat(renderNoPriorityTickets)}
        </ul>
      </div>
    </div>
  );
};

export default TicketList;
