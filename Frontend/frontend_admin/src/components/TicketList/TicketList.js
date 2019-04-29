import React from "react";
import styled from "styled-components";
import TicketListItem from "./TicketListItem";

const TicketList = styled.div`
  display: inline-block;
  min-height: 500px;
  max-height: 630px;
  width: calc((100vw - 80px) * (9.4 / 12));
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.18);
  overflow: scroll;
`;

const ListHeader = styled.div`
  background-color: hsl(210, 36%, 97%);
  border-radius: 8px 8px 0 0;
`;

const HeaderUL = styled.ul`
  padding: 0 40px;
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 7fr 2.5fr 3fr 4.5fr 3fr;
`;

const ListItem = styled.li`
  padding: 16px 0;
  color: #334e68;
  text-transform: uppercase;
  font-size: 14px;
`;

const TicketListComp = ({ user, tickets }) => {
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

  return (
    <TicketList>
      <ListHeader>
        <HeaderUL>
          <ListItem>Subject</ListItem>
          <ListItem>Status</ListItem>
          <ListItem>Requester</ListItem>
          <ListItem>Last Updated</ListItem>
          <ListItem>Group</ListItem>
        </HeaderUL>
      </ListHeader>
      <div>
        <ul>{user && renderPriorityTickets.concat(renderNoPriorityTickets)}</ul>
      </div>
    </TicketList>
  );
};

export default TicketListComp;
