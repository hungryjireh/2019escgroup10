import React, { useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import history from "../history";
import axios from "axios";
import { deleteDB } from "idb";

import { messaging } from "../firebase";
import { image } from "faker";
import Settings from "./Settings/Settings";

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
  cursor: pointer;
`;

const LiButton = styled.button`
  font-size: 1.6rem;
  color: #334e68;
  cursor: pointer;
  border: none;
  background: none;
`;

const NavComp = ({ user, setPage }) => {
  const [hasSettings, setHasSettings] = useState(false);

  const setHasSettingsFalse = () => {
    setHasSettings(false);
  };

  const handlePageButtonClick = e => {
    localStorage.setItem("currentPage", e.target.innerText);
    setPage(e.target.innerText);
  };

  const handleLogout = () => {
    messaging.getToken().then(async token => {
      axios.post("https://calm-falls-75658.herokuapp.com/api/push", {
        token,
        updatesArray: [false, false, false, false, false]
      });

      // deleteDB("myIndexedDB");
      localStorage.setItem("admin-is-logged-in", false);
      localStorage.setItem("admin-logged-in-jti", "");
      localStorage.setItem("admin-logged-in-userid", "");
      history.push("/");
    });
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
          <LiButton onClick={handlePageButtonClick}>Dashboard</LiButton>
        </ListLi>
        <ListLi>
          <LiButton onClick={handlePageButtonClick}>Statistics</LiButton>
        </ListLi>
        <ListLi>
          <LiButton
            onClick={() => {
              setHasSettings(true);
            }}
          >
            Settings
          </LiButton>
        </ListLi>
        <ListLi>
          <LiButton onClick={handleLogout}>Logout</LiButton>
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
      <div>
        {hasSettings &&
          ReactDOM.createPortal(
            <Settings user={user} setHasSettingsFalse={setHasSettingsFalse} />,
            document.querySelector("#settings")
          )}
      </div>
    </Nav>
  );
};

export default NavComp;
