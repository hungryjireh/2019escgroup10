import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Overview from "./Overview";
import TicketList from "./TicketList";
import UpdateList from "./UpdateList";
import "../style/Dashboard.css";
import history from "../history";

import { db } from "../firebase";
import useCollection from "./useCollection";

const Dashboard = () => {
  const histObject = history.location;

  const tickets = useCollection("tickets");

  const [user, setUser] = useState(null);
  useEffect(() => {
    if (!histObject.state) {
      return;
    }
    db.doc(`users/${histObject.state.userID}`)
      .get()
      .then(response => {
        setUser({
          ...response.data(),
          id: response.id
        });
      });
  }, []);

  useEffect(() => {
    if (user) {
      console.log(user);
      console.log(`You are ${!user.name}`);
      if (!user.name) {
        localStorage.setItem("admin-is-logged-in", false);
        localStorage.setItem("admin-logged-in-jti", "");
        localStorage.setItem("admin-logged-in-userid", "");
        return <h1 style={{ color: "red" }}>No such user in DB.</h1>;
      }
    }
  });

  const [overviewStatus, setOverviewStatus] = useState([0, 0, 0, 0]);

  const fetchOverviewStatus = ls => {
    const status = [0, 0, 0, 0, 0];
    for (let i = 0; i < ls.length; i++) {
      if (ls[i].status === "Unviewed") {
        status[0]++;
      } else if (ls[i].status === "Await Your Reply") {
        status[1]++;
      } else if (ls[i].status === "Client Replied") {
        status[2]++;
      } else if (ls[i].status === "Admin Replied") {
        status[3]++;
      } else {
        status[4]++;
      }
    }
    setOverviewStatus(status);
  };

  useEffect(() => {
    fetchOverviewStatus(tickets);
  }, [tickets]);

  return histObject.state &&
    // user &&
    // user.name &&
    localStorage.getItem("admin-logged-in-jti") === histObject.state.jti ? (
    <div className="dashboard">
      <Navbar />
      <h1 className="dashboard-title">
        Welcome to Your Dashboard, {user && user.name}
      </h1>
      <Overview overviewStatus={overviewStatus} />
      <div className="content">
        <TicketList user={user} tickets={tickets} />
        <UpdateList user={user} />
      </div>
      {/* <div className="copyright">© Class 1 Group 10, 2019</div> */}
    </div>
  ) : null;
};

export default overviewStatus;
