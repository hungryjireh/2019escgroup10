import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "./Select.css";

import { db } from "../../firebase";

const DefaultsSection = styled.div``;

const DefaultsItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 3rem;
  //   border: 1px solid black;
`;

const ItemHead = styled.span`
  color: #334e68;
  font-weight: 100;
  font-size: 1.6rem;
  padding: 0.5rem 0;
`;

const ItemSelect = styled.span``;

const PrioritiesTable = styled.div`
  width: 46rem;
  height: 30rem;
  border: 0.5px solid #abc1d5;
  margin-top: 0.6rem;
`;

const TableHead = styled.div`
  display: flex;
  height: 50px;
  background: #f5f7fa;
  padding: 1rem 3.8rem;

  & > span {
    color: #334e68;
    font-weight: 100;
    font-size: 1.4rem;
    padding: 0.6rem 0;
  }
`;

const TableContent = styled.div`
  height: calc(100% - 100px);
  overflow: scroll;
  //   overscroll-behavior: none;
`;

const TableAdd = styled.div`
  padding: 1rem 3rem;
  display: flex;
  justify-content: space-between;
  background-color: #f5f7fa;
  position: relative;

  & > span {
    display: none
    position: absolute;
    font-size: 1.6rem;
    color: #007cb2;
    right: 1.4rem;
    top: 1.5rem;
    cursor: pointer;
  }

  &:hover {
    background-color: #dde4ee;

    & > div > select {
      background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
      background-repeat: no-repeat, repeat;
      background-position: right 1.8em top 50%, 0 0;
      background-size: 0.65em auto, 100%;
    }

    & > span {
        display: inline;
    }
  }
`;

const ContentItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 1rem 3rem;
  border-bottom: 1px solid #f1f5f8;
  position: relative;

  & > span {
    display: none
    position: absolute;
    font-size: 1.6rem;
    color: #007cb2;
    right: 1.4rem;
    top: 1.5rem;
    cursor: pointer;
  }

  &:hover {
    background-color: #f5f7fa;

    & > div > select {
      background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
      background-repeat: no-repeat, repeat;
      background-position: right 1.8em top 50%, 0 0;
      background-size: 0.65em auto, 100%;
    }

    & > span {
        display: inline;
    }
  }
`;

const WrongMessage = styled.div`
  //   display: none;
  font-size: 1.4rem;
  color: red;
  text-align: right;
  margin-top: -1rem;
  width: 100%;
  height: 17px;
`;

const DefaultsSectionComp = ({ user }) => {
  const [criteriaAddValue, setCriteriaAddValue] = useState("Add Criteria");
  const [highlightAddValue, setHighlightAddValue] = useState("Colour");
  const [isWrong, setIsWrong] = useState(false);
  const criteriaChosen = [];
  let criteriaUnchosen = {
    status: [
      "Unviewed",
      "Await Your Reply",
      "Client Replied",
      "Admin Replied",
      "Closed"
    ],
    group: user.config.groups
  };
  if (user) {
    for (let i = 0; i < user.config.priorities.length; i++) {
      criteriaChosen.push(user.config.priorities[i].criteria);
    }
    let statusArray = criteriaUnchosen.status.filter(status => {
      if (!criteriaChosen.includes(status)) {
        return status;
      }
    });
    let groupArray = criteriaUnchosen.group.filter(group => {
      if (!criteriaChosen.includes(group)) {
        return group;
      }
    });
    criteriaUnchosen.status = statusArray;
    criteriaUnchosen.group = groupArray;
  }

  useEffect(() => {
    if (isWrong) {
      document.querySelector(".wrong-message").innerText =
        "*Please select criteria and highlight colour";
    } else {
      document.querySelector(".wrong-message").innerText = "";
    }
  }, [isWrong]);

  const renderTableContent = () => {
    if (user) {
      const content = user.config.priorities.map((priority, index) => {
        return (
          <ContentItem
            onChange={e => {
              let updated = user.config.priorities;
              if (e.target.classList[0] === "criteria") {
                updated[parseInt(e.target.classList[1], 10)].criteria =
                  e.target.value;
              } else {
                updated[parseInt(e.target.classList[1], 10)].highlight =
                  e.target.value;
              }

              db.doc(`users/${user.id}`).update({
                config: {
                  ...user.config,
                  priorities: updated
                }
              });
            }}
          >
            <div className="table-select">
              <select className={"criteria " + index} value={priority.criteria}>
                <optgroup label="Current">
                  <option value={priority.criteria}>{priority.criteria}</option>
                </optgroup>
                <optgroup label="Status">
                  {criteriaUnchosen.status.map(status => {
                    return <option value={status}>{status}</option>;
                  })}
                </optgroup>
                <optgroup label="Group">
                  {criteriaUnchosen.group.map(group => {
                    return <option value={group}>{group}</option>;
                  })}
                </optgroup>
              </select>
            </div>
            <div className={"color-box " + priority.highlight + "-bg"} />
            <div className="table-select">
              <select
                className={"highlight " + index}
                value={priority.highlight}
              >
                <option value={"Yellow"}>Yellow</option>
                <option value={"Green"}>Green</option>
                <option value={"Blue"}>Blue</option>
                <option value={"Red"}>Red</option>
                <option value={"Purple"}>Purple</option>
                <option value={"Violet"}>Violet</option>
              </select>
            </div>
            <span
              className={index}
              onClick={e => {
                let updated = user.config.priorities;
                updated.splice(parseInt(e.target.className, 10), 1);
                db.doc(`users/${user.id}`).update({
                  config: {
                    ...user.config,
                    priorities: updated
                  }
                });
              }}
            >
              &#10006;
            </span>
          </ContentItem>
        );
      });

      return content;
    }
  };

  return (
    <DefaultsSection>
      <DefaultsItem>
        <ItemHead>Default sort order</ItemHead>
        <ItemSelect>
          <div
            class="default-select"
            onChange={e => {
              db.doc(`users/${user.id}`).update({
                config: {
                  ...user.config,
                  defaultSort: e.target.selectedOptions[0].innerText
                }
              });
            }}
          >
            <select
              value={user && user.config.defaultSort}
              className="sort-select"
            >
              <option value="Status">Status</option>
              <option value="Last Updated Oldest First">
                Last Updated Oldest First
              </option>
              <option value="Last Updated Newest First">
                Last Updated Newest First
              </option>
              <option value="Group">Group</option>
              <option value="Requester">Requester</option>
              <option value="Subject">Subject</option>
            </select>
          </div>
        </ItemSelect>
      </DefaultsItem>
      <DefaultsItem>
        <ItemHead>Priorities</ItemHead>
        <PrioritiesTable>
          <TableHead>
            <span style={{ marginRight: "auto" }}>Criteria</span>
            <span className="highlight-head">Highlight</span>
          </TableHead>
          <TableContent>{renderTableContent()}</TableContent>
          <TableAdd>
            <div className="table-select">
              <select
                value={criteriaAddValue}
                className="criteria-select"
                onChange={e => {
                  setCriteriaAddValue(e.target.value);
                  setIsWrong(false);
                }}
              >
                <option value="Add Criteria">Add Criteria</option>
                <optgroup label="Status">
                  {criteriaUnchosen.status.map(status => {
                    return <option value={status}>{status}</option>;
                  })}
                </optgroup>
                <optgroup label="Group">
                  {criteriaUnchosen.group.map(group => {
                    return <option value={group}>{group}</option>;
                  })}
                </optgroup>
                {/* <option value="Add Criteria">Add Criteria</option>
                <option value="Unviewed">Unviewed</option>
                <option value="Await Your Reply">Await Your Reply</option>
                <option value="Client Replied">Client Replied</option>
                <option value="Admin Replied">Admin Replied</option>
                <option value="Closed">Closed</option> */}
              </select>
            </div>
            {/* <div className="color-box Yellow-bg" /> */}
            <div className="table-select">
              <select
                value={highlightAddValue}
                className="highlight-select"
                onChange={e => {
                  setHighlightAddValue(e.target.value);
                  setIsWrong(false);
                }}
              >
                <option value="Colour">Colour</option>
                <option value="Yellow">Yellow</option>
                <option value="Green">Green</option>
                <option value="Blue">Blue</option>
                <option value="Red">Red</option>
                <option value="Purple">Purple</option>
                <option value="Violet">Violet</option>
              </select>
            </div>
            <span
              onClick={e => {
                const criteria = document.querySelector(".criteria-select")
                  .value;
                const highlight = document.querySelector(".highlight-select")
                  .value;
                if (criteria !== "Add Criteria" && highlight !== "Colour") {
                  let updated = user.config.priorities;
                  updated.push({
                    criteria,
                    highlight
                  });
                  db.doc(`users/${user.id}`).update({
                    config: {
                      ...user.config,
                      priorities: updated
                    }
                  });
                  setCriteriaAddValue("Add Priority");
                  setHighlightAddValue("Colour");
                } else {
                  setIsWrong(true);
                }
              }}
            >
              +
            </span>
          </TableAdd>
        </PrioritiesTable>
      </DefaultsItem>
      <WrongMessage className="wrong-message" />
    </DefaultsSection>
  );
};

export default DefaultsSectionComp;
