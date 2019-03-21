import React from "react";
import styled from "styled-components";

const OverviewSection = styled.div`
  display: inline-block;
  border-right: ${props => (props.noBorder ? "0px" : "0.5px solid #BCCCDC")};
  margin-right: 5rem;
`;

const SectionHeader = styled.div`
  // border: 1px solid green;
  font-size: 1.4rem;
  color: #b3ecff;
  text-transform: uppercase;
  margin: 0 5rem 2rem 0;
`;

const OverviewSectionComp = props => {
  return (
    <OverviewSection noBorder={props.noBorder}>
      <SectionHeader>{props.header}</SectionHeader>
      {props.children}
    </OverviewSection>
  );
};

export default OverviewSectionComp;
