import React from "react";
import styled from "styled-components";

const StatisticsLegend = styled.div`
  width: 100%;
  height: 3rem;
`;

const LegendList = styled.ul`
  display: flex;
  justify-content: center;
  align-items: bottom;
  height: 100%;
`;

const LegendItem = styled.li`
  display: flex;
  align-items: center;
  margin-right: 1.2rem;

  & > span {
    height: 1rem;
    width: 1rem;
    margin-right: 0.4rem;
  }

  & > p {
    font-size: 1.4rem;
    font-weight: 100;
    color: #334e68;
  }
`;

const StatisticsLegendComp = ({ user, colors, statSelectValue }) => {
  let legend = [];
  switch (statSelectValue) {
    default:
      legend = [];
      break;
    case "Number of tickets submitted":
      legend = ["Tickets submitted", "Tickets closed"];
      break;
    case "Tickets submitted by Group (abs)":
      legend = user.config.groups;
      break;
  }

  const legendItems = legend.map((item, index) => {
    return (
      <LegendItem>
        <span style={{ backgroundColor: `${colors[index]}` }} />
        <p>{item}</p>
      </LegendItem>
    );
  });
  return (
    <StatisticsLegend>
      <LegendList>{legendItems}</LegendList>
    </StatisticsLegend>
  );
};

export default StatisticsLegendComp;
