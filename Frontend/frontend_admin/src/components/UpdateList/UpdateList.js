import React from "react";
import UpdateItem from "./UpdateItem";
import styled from "styled-components";

import useCollection from "../../Hooks/useCollection";

const UpdateList = styled.div`
  display: inline-block;
  width: calc((100vw - 80px) * (2.4 / 12));
  margin-left: auto;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.18);
  font-size: 1.4rem;
`;

const ListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px;
  background-color: hsl(210, 36%, 97%);
  border-radius: 8px 8px 0 0;
  text-transform: uppercase;
  color: #334e68;
  position: relative;
`;

const HeaderTitle = styled.div``;

const HeaderButton = styled.button`
    cursor: pointer
    border: none;
    background-color: inherit;
    font-size: 1.4rem;
`;

const HeaderPopup = styled.div`
  display: none;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.18);
  background-color: white;
  position: absolute;
  right: 2.2rem;
  top: 4rem;

  & > ul {
    display: flex;
    flex-direction: column;
  }
`;

const PopupOptions = styled.li`
  & > button {
    width: 100%;
    border: none;
    background-color: white;
    text-align: center;
    font-size: 1.4rem;
    color: #334e68;
    padding: 1.6rem;

    &:hover {
      background-color: hsl(210, 36%, 97%);
      cursor: pointer;
    }
  }
`;

const ListContent = styled.ul`
  min-height: 500px;
  max-height: 580px;
  overflow: scroll;
`;

function handleHeaderButtonClick() {
  const popup = document.querySelector(".popup");
  const button = document.querySelector(".headerbutton");
  if (popup.style.display) {
    popup.style.display = "";
    button.innerText = "▼";
  } else {
    popup.style.display = "block";
    button.innerText = "―";
  }
}

function handleOptionsButtonClick(event) {
  document.querySelector(".title").innerText = event.target.innerText;
}

const UpdateListComp = ({ user }) => {
  const updates = useCollection("updates", "updatedTime");
  const reversedUpdates = [];
  if (updates.length > 0) {
    for (let i = updates.length - 1; i >= 0; i--) {
      reversedUpdates.push(updates[i]);
    }
  }

  const renderUpdates =
    user &&
    reversedUpdates
      .flatMap(update => {
        switch (update.type) {
          case "client-create":
            return user.config.updates[0] ? (
              <UpdateItem key={update.id} update={update} user={user} />
            ) : (
              []
            );
          case "client-update":
            return user.config.updates[1] ? (
              <UpdateItem key={update.id} update={update} user={user} />
            ) : (
              []
            );
          case "admin-update":
            if (user.id === update.userID) {
              return user.config.updates[3] ? (
                <UpdateItem key={update.id} update={update} user={user} />
              ) : (
                []
              );
            } else {
              return user.config.updates[2] ? (
                <UpdateItem key={update.id} update={update} user={user} />
              ) : (
                []
              );
            }
        }
        return <UpdateItem key={update.id} update={update} user={user} />;
      })
      .slice(0, 10);

  return (
    <UpdateList>
      <ListHeader>
        <HeaderTitle className="title">Updates</HeaderTitle>
        <HeaderButton
          className="headerbutton"
          type="button"
          onClick={handleHeaderButtonClick}
        >
          &#x25BC;
        </HeaderButton>
        <HeaderPopup className="popup">
          <ul>
            <PopupOptions>
              <button type="button" onClick={handleOptionsButtonClick}>
                Updates
              </button>
            </PopupOptions>
            <PopupOptions>
              <button type="button" onClick={handleOptionsButtonClick}>
                Notes
              </button>
            </PopupOptions>
          </ul>
        </HeaderPopup>
      </ListHeader>
      <ListContent>{renderUpdates}</ListContent>
    </UpdateList>
  );
};

export default UpdateListComp;
