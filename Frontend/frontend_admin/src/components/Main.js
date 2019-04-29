import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { openDB } from "idb";

import Navbar from "./Navbar";
import Dashboard from "./Dashboard";
import Statistics from "./Statistics/Statistics";
import history from "../history";
import { db, messaging } from "../firebase";

const Main = styled.div``;

const MainComp = ({ match }) => {
  const histObject = history.location;

  const [page, setPage] = useState("Dashboard");

  const [user, setUser] = useState(null);
  useEffect(() => {
    if (!histObject.state) {
      return;
    }
    db.doc(`users/${histObject.state.userID}`).onSnapshot(snapshot => {
      setUser({
        ...snapshot.data(),
        id: snapshot.id
      });
    });
  }, []);

  useEffect(() => {
    if (user && user.config.updates[4]) {
      messaging
        .requestPermission()
        .then(async () => {
          console.log("Permission granted!");
          const idb = await openDB("myIndexedDB", 3, {
            upgrade(idb) {
              idb.createObjectStore("groupsStore");
            }
          });

          await idb.put("groupsStore", user.config.groups, "groups");
          return messaging.getToken();
        })
        .then(token => {
          axios.post("https://calm-falls-75658.herokuapp.com/api/push-init", {
            token,
            updatesArray: user.config.updates
          });
        })
        .catch(() => {
          console.log("Permission denied!");
        });

      messaging.onMessage(payload => {
        console.log("onMessage: ", payload);
      });
    }
  }, [user]);

  return histObject.state &&
    localStorage.getItem("admin-logged-in-jti") === histObject.state.jti ? (
    <Main>
      <Navbar user={user} setPage={setPage} />
      {page === "Dashboard" ? (
        <Dashboard user={user} />
      ) : (
        <Statistics user={user} />
      )}
    </Main>
  ) : null;
};

export default MainComp;
