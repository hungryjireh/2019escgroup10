import React from "react";
import styled from "styled-components";
import "./Toggle.css";

import { db } from "../../firebase";

const UpdatesSection = styled.div`
  //   border: 1px solid black;
`;

const UpdatesTitle = styled.h2`
  font-size: 1.6rem;
  color: #334e68;
  font-weight: 400;
  margin-bottom: 3rem;
`;

const UpdateItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 3rem;
  //   border: 1px solid black;
`;

const ItemHead = styled.span`
  color: #334e68;
  font-weight: 100;
  font-size: 1.6rem;
  padding: 0.2rem 0;
`;

const ItemToggle = styled.span``;

const UpdatesSectionComp = ({ user }) => {
  return (
    <UpdatesSection>
      <UpdatesTitle>Receive Updates When:</UpdatesTitle>
      <form
        onChange={e => {
          let updated = user.config.updates;
          updated[parseInt(e.target.className, 10)] = e.target.checked;
          db.doc(`users/${user.id}`).update({
            config: {
              ...user.config,
              updates: updated
            }
          });
        }}
      >
        <UpdateItem>
          <ItemHead>Clients submit ticket</ItemHead>
          <ItemToggle>
            <label class="switch">
              <input
                type="checkbox"
                className="0"
                checked={user && user.config.updates[0]}
              />
              <span class="slider round" />
            </label>
          </ItemToggle>
        </UpdateItem>
        <UpdateItem>
          <ItemHead>Clients update/comment on tickets</ItemHead>
          <ItemToggle>
            <label class="switch">
              <input
                type="checkbox"
                className="1"
                checked={user && user.config.updates[1]}
              />
              <span class="slider round" />
            </label>
          </ItemToggle>
        </UpdateItem>
        <UpdateItem>
          <ItemHead>Other admins update/comment on tickets</ItemHead>
          <ItemToggle>
            <label class="switch">
              <input
                type="checkbox"
                className="2"
                checked={user && user.config.updates[2]}
              />
              <span class="slider round" />
            </label>
          </ItemToggle>
        </UpdateItem>
        <UpdateItem>
          <ItemHead>You update/comment on tickets</ItemHead>
          <ItemToggle>
            <label class="switch">
              <input
                type="checkbox"
                className="3"
                checked={user && user.config.updates[3]}
              />
              <span class="slider round" />
            </label>
          </ItemToggle>
        </UpdateItem>
        <UpdatesTitle>Push Notifications:</UpdatesTitle>
        <UpdateItem>
          <ItemHead>Enable background push notifications for updates</ItemHead>
          <ItemToggle>
            <label class="switch">
              <input
                type="checkbox"
                className="4"
                checked={user && user.config.updates[4]}
              />
              <span class="slider round" />
            </label>
          </ItemToggle>
        </UpdateItem>
      </form>
    </UpdatesSection>
  );
};

export default UpdatesSectionComp;
