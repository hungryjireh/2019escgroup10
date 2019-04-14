import React, { useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

import BurgerMenu from "./BurgerMenu";
import "./Nav.css";

const Nav = styled.nav`
  max-width: 1440px;
  font-size: 1.5rem;
  font-family: "Montserrat", sans-serif;
  background: #000000;
  position: fixed;
  width: 100%;
  z-index: 3;
`;

export const NavList = styled.ul`
  display: flex;
  align-items: center;
`;

export const ListItem = styled.li`
  padding: 1.5rem;
  margin-left: 3rem;
  cursor: pointer
    &:hover > a {
    color: #f9c03f;
  }
`;

export const ItemLink = styled.a`
  color: #fefefe;
  &::selection {
    background-color: #f9c03f;
    color: #2e2e2e;
  }
`;

export const NavBurger = styled.img`
  display: none;

  @media (max-width: 1100px) {
    display: inline;
    margin: 0 2.4rem 0 3rem;
    width: 20px;
    cursor: pointer;
  }
`;

const NavComp = () => {
  const [hasBurger, setHasBurger] = useState(false);

  const handleBurgerClick = () => {
    setHasBurger(true);
  };

  const setHasBurgerFalse = () => {
    setHasBurger(false);
  };

  return (
    <Nav>
      <NavList>
        <ListItem style={{ margin: "0 auto 0 1.6rem" }}>
          <ItemLink data-testid="home-logo" href="https://beta.acnapi.io">
            <img
              className="company-logo"
              src={require("../assets/acnapi-logo-white.png")}
              alt="company logo"
              style={{ width: "83px" }}
            />
          </ItemLink>
        </ListItem>
        <ListItem className="nav-links">
          <ItemLink href="https://beta.acnapi.io/#!/#about_us">About Us</ItemLink>
        </ListItem>
        <ListItem className="nav-links">
          <ItemLink href="https://beta.acnapi.io/#!/#assets">Our Assets</ItemLink>
        </ListItem>
        <ListItem className="nav-links">
          <ItemLink href="https://beta.acnapi.io/#!/#case_study">Case Studies</ItemLink>
        </ListItem>
        <ListItem className="nav-links" style={{ margin: "0 1.6rem 0 3rem" }}>
          <ItemLink href="https://beta.acnapi.io/#!/">Contact Us</ItemLink>
        </ListItem>
        <NavBurger
          onClick={handleBurgerClick}
          src={require("../assets/burger-white.svg")}
          alt="nav burger"
        />
      </NavList>
      {hasBurger &&
        ReactDOM.createPortal(
          <BurgerMenu setHasBurgerFalse={setHasBurgerFalse} />,
          document.querySelector("#burger")
        )}
    </Nav>
  );
};

export default NavComp;
