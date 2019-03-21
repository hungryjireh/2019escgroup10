import React from "react";
// import '../style/Navbar.css';
import styled from "styled-components";
import history from "../history";

import { image } from "faker";
// console.log(image.avatar);

const Nav = styled.nav`
  font-size: 1.6rem;
  border-bottom: 0.5px solid #bcccdc;
  margin: 0 4rem 3rem 4rem;
`;

const NavList = styled.ul`
  display: flex;
  align-items: center;
`;

const ListLi = styled.li`
  display: inline-block;
  padding: 1.2rem 2rem 1.2rem 1.2rem;
`;

const LiAnchor = styled.a`
  color: #334e68;
`;

const NavComp = () => {
  const handleLogout = () => {
    localStorage.setItem("admin-is-logged-in", false);
    localStorage.setItem("admin-logged-in-jti", "");
    localStorage.setItem("admin-logged-in-userid", "");
    history.push("/");
  };
  return (
    <Nav>
      <NavList>
        <ListLi className="first-li" style={{ margin: "0 auto 0 0" }}>
          <LiAnchor href="https://beta.acnapi.io">
            <img
              src={require("../assets/images/acnapi-logo.png")}
              alt="Company logo"
              style={{ width: "80px" }}
            />
          </LiAnchor>
        </ListLi>
        <ListLi>
          <LiAnchor href="">Dashboard</LiAnchor>
        </ListLi>
        <ListLi>
          <LiAnchor href="">Settings</LiAnchor>
        </ListLi>
        <ListLi>
          <LiAnchor onClick={handleLogout} href="">
            Logout
          </LiAnchor>
        </ListLi>
        <ListLi>
          <LiAnchor href="">
            <img
              // src={require("../assets/images/sample-profile.png")}
              src={image.avatar()}
              alt="Profile"
              style={{ width: "50px", borderRadius: "50px" }}
            />
          </LiAnchor>
        </ListLi>
      </NavList>
    </Nav>
  );
};

export default NavComp;
