import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Overview from "./Overview/Overview";
import TicketList from "./TicketList/TicketList";
import UpdateList from "./UpdateList/UpdateList";
import useCollection from "../Hooks/useCollection";

const DashboardTitle = styled.h1`
  margin-left: 40px;
  margin-bottom: 30px;
  font-size: 32px;
  font-weight: 400;
  color: #334e68;
`;

const DashboardContent = styled.div`
  display: flex;
  margin-left: 40px;
  margin-right: 40px;
  margin-bottom: 80px;
`;

const findMedian = a => {
  if (a.length) {
    if (a.length % 2) {
      // truthy here means odd (returns value NOT 0)
      return a[Math.floor(a.length / 2)];
    } else {
      // falsy here means even (return value of 0)
      return (a[a.length / 2] + a[a.length / 2 - 1]) / 2;
    }
  } else {
    return 0;
  }
};

const Dashboard = ({ user }) => {
  let tickets;
  let ticketsSevenDays;
  if (user) {
    // ticketsSevenDays = useCollection("tickets", "submitTime", [
    //   {
    //     param: "submitTime",
    //     op: ">",
    //     val: subDays(startOfDay(new Date()), 8)
    //   }
    // ]);

    switch (user.config.defaultSort) {
      case "Status":
        tickets = useCollection("tickets", "statusInt");
        break;
      case "Last Updated Oldest First":
        tickets = useCollection("tickets", "lastUpdatedTime");
        break;
      case "Last Updated Newest First":
        tickets = useCollection("tickets", "lastUpdatedTime").reverse();
        break;
      case "Group":
        tickets = useCollection("tickets", "group");
        break;
      case "Requester":
        tickets = useCollection("tickets", "requester");
        break;
      case "Subject":
        tickets = useCollection("tickets", "subject");
        break;
    }
  } else {
    tickets = useCollection("tickets");
  }

  useEffect(() => {
    if (user) {
      if (!user.name) {
        localStorage.setItem("admin-is-logged-in", false);
        localStorage.setItem("admin-logged-in-jti", "");
        localStorage.setItem("admin-logged-in-userid", "");
        return <h1 style={{ color: "red" }}>No such user in DB.</h1>;
      }
    }
  });

  const [overviewGroupsStatus, setOverviewGroupsStatus] = useState([
    0,
    0,
    0,
    0,
    0
  ]);
  const [overviewFirstResponse, setOverviewFirstResponse] = useState(0);
  const [overviewResolution, setOverviewResolution] = useState(0);
  const [overviewSatisfaction, setOverviewSatisfaction] = useState(0);

  const fetchOverviewGroupsStatus = ls => {
    const status = [0, 0, 0, 0, 0, 0];
    for (let i = 0; i < ls.length; i++) {
      if (ls[i].status === "Unviewed") {
        status[0]++;
      } else if (ls[i].status === "Await Your Reply") {
        status[1]++;
      } else if (ls[i].status === "Client Replied") {
        status[2]++;
      } else if (ls[i].status === "Admin Replied") {
        status[3]++;
      } else if (ls[i].status === "Await Closure") {
        status[4]++;
      } else {
        status[5]++;
      }
    }
    setOverviewGroupsStatus(status);
  };

  const fetchOverviewStatsStatus = ls => {
    const firstResponseTimes = [];
    const resolutionTimes = [];
    const satisfactionNumbers = [];
    for (let i = 0; i < ls.length; i++) {
      if (ls[i].firstResponseTime) {
        firstResponseTimes.push(
          (ls[i].firstResponseTime.toDate() - ls[i].submitTime.toDate()) / 60000
        );
        firstResponseTimes.sort();
      }
      if (ls[i].resolutionTime) {
        resolutionTimes.push(
          (ls[i].resolutionTime.toDate() - ls[i].submitTime.toDate()) / 3600000
        );
        resolutionTimes.sort();
      }
      if (ls[i].satisfaction) {
        satisfactionNumbers.push(ls[i].satisfaction);
      }
    }
    setOverviewFirstResponse(findMedian(firstResponseTimes));
    setOverviewResolution(findMedian(resolutionTimes));
    setOverviewSatisfaction(
      satisfactionNumbers.length
        ? satisfactionNumbers.reduce((acc, current) => {
            return acc + current;
          }) / satisfactionNumbers.length
        : 0
    );
  };

  useEffect(() => {
    console.log(tickets);
    console.log(ticketsSevenDays);
    if (user) {
      // tickets = tickets.filter(ticket => {
      //   return user.config.groups.includes(ticket.group);
      // });

      fetchOverviewGroupsStatus(tickets);
      fetchOverviewStatsStatus(tickets);
    }
  }, [tickets, ticketsSevenDays]);

  return (
    <div className="dashboard">
      <DashboardTitle className="dashboard-title">
        Welcome to Your Dashboard, {user && user.name}
      </DashboardTitle>
      <Overview
        overviewGroupsStatus={overviewGroupsStatus}
        overviewFirstResponse={overviewFirstResponse}
        overviewResolution={overviewResolution}
        overviewSatisfaction={overviewSatisfaction}
      />
      <DashboardContent>
        <TicketList user={user} tickets={tickets} />
        <UpdateList user={user} />
      </DashboardContent>
    </div>
  );
};

export default Dashboard;
