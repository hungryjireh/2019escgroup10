import React from "react";
import styled from "styled-components";
import { formatRelative } from "date-fns/esm";

const UpdateItem = styled.li`
  // border: 1px solid black;
  padding: 1.4rem;
  font-size: 1.4rem;
  color: #262626;
  border-bottom: 1px solid hsl(210, 36%, 96%);

  &:hover {
    background-color: hsl(210, 36%, 97%);
    cursor: pointer;
  }
`;

const ItemMain = styled.div`
  // border: 1px solid red;
  margin-bottom: 1rem;
`;

const ItemSub = styled.div`
  // border: 1px solid green;
  margin-bottom: 2rem;
  color: #737373;
`;

const ItemInfo = styled.div`
  // border: 1px solid blue;
  color: hsl(210, 36%, 80%);
  font-size: 1.2rem;
`;

const contentTruncate = contentString => {
  if (contentString) {
    if (contentString.length > 345) {
      return contentString.slice(0, 340) + "...";
    } else {
      return contentString;
    }
  }
};

const UpdateItemComp = ({ update, user }) => {
  const renderContent = update => {
    switch (update.type) {
      case "client-update":
      case "admin-update":
        const who =
          update.type === "client-update"
            ? "Client " + update.requester
            : user && user.id !== update.userID
            ? "Admin " + update.requester
            : "You";
        return (
          <UpdateItem>
            <ItemMain>
              {who} <b>commented</b> on "{update.subject}".
            </ItemMain>
            <ItemSub>{contentTruncate(update.content)}</ItemSub>
            <ItemInfo style={{ textTransform: "capitalize" }}>
              {formatRelative(update.updatedTime.toDate(), new Date())}
            </ItemInfo>
          </UpdateItem>
        );
      case "client-create":
        return (
          <UpdateItem>
            <ItemMain>
              Client {update.requester} <b>submitted a ticket</b> on "
              {update.subject}".
            </ItemMain>
            <ItemSub>{contentTruncate(update.content)}</ItemSub>
            <ItemInfo style={{ textTransform: "capitalize" }}>
              {formatRelative(update.updatedTime.toDate(), new Date())}
            </ItemInfo>
          </UpdateItem>
        );
      default:
        return null;
    }
  };
  return renderContent(update);
};

export default UpdateItemComp;
