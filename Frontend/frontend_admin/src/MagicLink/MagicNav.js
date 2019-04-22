import React from "react";
import styled from "styled-components";

const MagicNav = styled.div``;

const NavList = styled.ul`
  display: flex;
  justify-content: space-between;
  padding: 0 4rem;
  //   border: 1px solid red;
`;

const ListItem = styled.li`
  padding: 4rem;

  & > img {
    width: 80px;
  }

  & > p {
    font-size: 1.8rem;
    color: #334e68;
    font-weight: 100;
  }
`;

const MagicNavComp = () => {
  return (
    <MagicNav>
      <NavList>
        <ListItem>
          <img
            src={require("../assets/images/acnapi-logo-blue.svg")}
            // src={require("../assets/images/acnapi-logo.png")}
            alt="logo"
          />
        </ListItem>
        <ListItem>
          <p>Settings</p>
        </ListItem>
      </NavList>
    </MagicNav>
  );
};

export default MagicNavComp;
