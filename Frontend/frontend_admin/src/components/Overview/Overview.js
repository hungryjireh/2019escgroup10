import React from "react";
import styled from "styled-components";
import OverviewSection from "./OverviewSection";
import OverviewItem from "./OverviewItem";

const Overview = styled.div`
  margin: 0 4rem 3rem 4rem;
  padding: 4rem;
  background-color: hsl(209, 36%, 50%);
  border-radius: 8px;
`;

const SectionList = styled.ul`
  display: flex;
`;

const OverviewComp = ({
  overviewGroupsStatus,
  overviewFirstResponse,
  overviewResolution,
  overviewSatisfaction
}) => {
  return (
    <Overview>
      <OverviewSection header="Status Overview">
        <SectionList>
          <OverviewItem num={overviewGroupsStatus[0]} name={"Unviewed"} />
          <OverviewItem
            num={overviewGroupsStatus[1]}
            name={"Await Your Reply"}
          />
          <OverviewItem num={overviewGroupsStatus[2]} name={"Client Replied"} />
          <OverviewItem num={overviewGroupsStatus[3]} name={"Admin Replied"} />
          <OverviewItem num={overviewGroupsStatus[4]} name={"Await Closure"} />
          <OverviewItem num={overviewGroupsStatus[5]} name={"Closed"} />
        </SectionList>
      </OverviewSection>
      <OverviewSection header="Avg. First Response Time" noBorder>
        <SectionList>
          <OverviewItem
            num={Math.round(overviewFirstResponse)}
            name={"Minutes"}
          />
        </SectionList>
      </OverviewSection>
      <OverviewSection header="Avg. Resolution Time" noBorder>
        <SectionList>
          <OverviewItem num={Math.round(overviewResolution)} name={"Hours"} />
        </SectionList>
      </OverviewSection>
      <OverviewSection header="Ticket Satisfaction" noBorder>
        <SectionList>
          <OverviewItem num={overviewSatisfaction} name={"Satisfaction"} />
        </SectionList>
      </OverviewSection>
    </Overview>
  );
};

export default OverviewComp;
