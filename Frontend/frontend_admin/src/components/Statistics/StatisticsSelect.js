import React from "react";
import styled from "styled-components";

import "./Select.css";

const StatisticsSelect = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  margin-bottom: 1.6rem;

  & > label {
    margin-right: 1rem;
    font-size: 14px;
    text-transform: uppercase;
    color: #abc1d5;
    font-weight: 100;
  }
`;

const ItemSelect = styled.span`
  margin-right: 2rem;
`;

const StatisticsSelectComp = ({
  statSelectValue,
  rangeSelectValue,
  setStatSelectValue,
  setRangeSelectValue
}) => {
  return (
    <StatisticsSelect>
      <label>Statistic: </label>
      <ItemSelect>
        <div
          class="stats-select"
          onChange={e => {
            setStatSelectValue(e.target.value);
          }}
        >
          <select value={statSelectValue} className="sort-select">
            <optgroup label="Submission Statistics" />
            <option value="Number of tickets submitted">
              Number of tickets submitted
            </option>
            {/* <option value="Tickets submitted by Group (%)">
              Tickets submitted by Group (%)
            </option> */}
            <option value="Tickets submitted by Group (abs)">
              Tickets submitted by Group (abs)
            </option>
            <optgroup label="Response Statistics" />
            <option value="Median first response time (minutes)">
              Median first response time (minutes)
            </option>
            <option value="Median resolution time (hours)">
              Median resolution time (hours)
            </option>
            <option value="Mean ticket satisfaction">
              Mean ticket satisfaction
            </option>
          </select>
        </div>
      </ItemSelect>
      <label>Range: </label>
      <ItemSelect>
        <div
          class="stats-select"
          onChange={e => {
            setRangeSelectValue(e.target.value);
          }}
        >
          <select value={rangeSelectValue} className="sort-select">
            <option value="Past 7 Days">Past 7 Days</option>
            <option value="Past 30 Days">Past 30 Days</option>
            {/* <option value="Past 90 Days">Past 90 Days</option> */}
          </select>
        </div>
      </ItemSelect>
    </StatisticsSelect>
  );
};

export default StatisticsSelectComp;
