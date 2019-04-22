import React from "react";
// import '../style/Statistics.css'
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

const OverviewComp = ({ overviewStatus }) => {
  return (
    <Overview>
      <OverviewSection header="Immediate Attention">
        <SectionList>
          <OverviewItem critical num="36" name={"Resolve Now"} />
        </SectionList>
      </OverviewSection>
      <OverviewSection header="Status Overview">
        <SectionList>
          <OverviewItem num={overviewStatus[0]} name={"Unviewed"} />
          <OverviewItem num={overviewStatus[1]} name={"Await Your Reply"} />
          <OverviewItem num={overviewStatus[2]} name={"Client Replied"} />
          <OverviewItem num={overviewStatus[3]} name={"Admin Replied"} />
          <OverviewItem num={overviewStatus[4]} name={"Closed"} />
        </SectionList>
      </OverviewSection>
      <OverviewSection header="Ticket Satisfaction" noBorder>
        <SectionList>
          <OverviewItem num="4.99 / 5.00" name={"Satisfaction"} />
        </SectionList>
      </OverviewSection>
    </Overview>
  );
};

// const Overview = () => {
//     return (
//         <div className="stats">
//             <div className="stats-status">
//                 <div className="stats-status-header">Status Overview</div>
//                 <ul className="stats-status-list">
//                     <OverviewItem num={123} name={"unviewed"} />
//                     <OverviewItem num={26} name={"Awaiting Your Reply"} />
//                     <OverviewItem num={32} name={"Awaiting Client Reply"} />
//                     <OverviewItem num={6} name={"Closed"} />
//                 </ul>
//             </div>
//             <div className="stats-satisfaction"></div>
//         </div>
//     );
// };

export default OverviewComp;
