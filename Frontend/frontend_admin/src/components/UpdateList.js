import React from "react";
import UpdateItem from "./UpdateItem";
import styled from "styled-components";

import useCollection from "./useCollection";

const UpdateList = styled.div`
  display: inline-block;
  //   min-height: 500px;
  //   max-height: 620px;
  width: calc((100vw - 80px) * (2.4 / 12));
  /* border: 2px solid gold; */
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

export const HeaderButton = styled.button`
    cursor: pointer
    border: none;
    background-color: inherit;
    font-size: 1.4rem;

    // &:hover +.popup {
    //     display: block;
    // }
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

export const PopupOptions = styled.li`
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

export const ListContent = styled.ul`
  min-height: 500px;
  max-height: 580px;
  overflow: scroll;
  //   overscroll-behavior: none;
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

export const UpdateListComp = ({ user }) => {
  const updates = useCollection("updates", "updatedTime");
  const reversedUpdates = [];
  if (updates.length > 0) {
    for (let i = updates.length - 1; i >= 0; i--) {
      reversedUpdates.push(updates[i]);
    }
  }

  const renderUpdates = reversedUpdates.slice(0, 10).map(update => {
    return <UpdateItem key={update.id} update={update} user={user} />;
  });

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
      <ListContent data-testid="list">{renderUpdates}</ListContent>
    </UpdateList>
  );
};

// const UpdateList = (props) => {
//     // const updates = props.updates.map((update) => {
//     //     return <UpdateItem update={update} />
//     // });

//     return (
//         <div className="updatelist">
//             <div className="updatelist-header">
//                 Your Updates
//             </div>
//             <ul>
//                 <UpdateItem />
//             </ul>
//         </div>
//     );
// };

export default UpdateListComp;
