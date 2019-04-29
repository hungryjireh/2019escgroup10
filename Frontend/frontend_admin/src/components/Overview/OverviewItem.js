import React from "react";
import styled from "styled-components";

const OverviewItem = styled.li`
  margin-right: 2rem;
`;

const ItemNum = styled.div`
  font-size: 5.2rem;
  color: ${props => (props.critical ? "#D64545" : "white")};
  margin-bottom: 2rem;
`;

const ItemHeader = styled.div`
  color: #b3ecff;
  font-size: 14px;
  text-transform: uppercase;
  margin-bottom: 16px;
  border-bottom: ${props => (props.critical ? "1px dotted #B3ECFF" : "0px")};
  cursor: ${props => (props.critical ? "pointer" : "")};
`;

const OverviewItemComp = props => {
  return (
    <OverviewItem>
      <ItemNum critical={props.critical}>{props.num}</ItemNum>
      <ItemHeader critical={props.critical}>{props.name}</ItemHeader>
    </OverviewItem>
  );
};

export default OverviewItemComp;
