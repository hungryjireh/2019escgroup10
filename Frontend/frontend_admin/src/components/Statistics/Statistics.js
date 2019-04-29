import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  select as d3Select,
  axisBottom,
  axisLeft,
  scaleLinear,
  scaleBand,
  max as d3Max,
  mouse
} from "d3";
import startOfDay from "date-fns/startOfDay";
import eachDayOfInterval from "date-fns/eachDayOfInterval";
import subDays from "date-fns/subDays";
import daysDifference from "date-fns/differenceInCalendarDays";

import useCollection from "../../Hooks/useCollection";
import StatisticsSelect from "./StatisticsSelect";
import StatisticsLegend from "./StatisticsLegend";

const Statistics = styled.div`
  padding: 0 40px;
`;

const Canvas = styled.div``;

const StatisticsTitle = styled.h1`
  margin-bottom: 3rem;
  font-size: 32px;
  font-weight: 400;
  color: #334e68;
`;

const Tooltip = styled.span`
  display: none;
  position: absolute;
  padding: 1rem;
  border-radius: 8px;
  background-color: rgba(51, 78, 104, 0.8);
  color: white;
  font-size: 1.4rem;

  & > span {
    display: flex;
    flex-direction: column;
  }

  & > span > p:first-child {
    margin-bottom: 0.6rem;
  }

  & > span > p > span {
    color: #febc12;
  }
`;

let userTickets = [];
let graphWidth = null;
let graphHeight = null;
let svg = null;
let graph = null;
let index = null;
let bandsDict = null;
let bands = {};
let daysBack = 7;
let xAxisGroup = null;
let yAxisGroup = null;
let x = null;
let y = null;
let xAxis = null;
let yAxis = null;
let dottedLines = null;
let xDottedLine = null;
let yDottedLine = null;
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
let colors = ["#febc12", "#1010fe", "#31a354", "#87125e", "#ff748c"];

const insertLinebreaks = function(d) {
  var el = d3Select(this);
  var words = d3Select(this)
    .text()
    .split(" ");
  el.text("");

  for (var i = 0; i < words.length; i++) {
    var tspan = el.append("tspan").text(words[i]);
    if (i > 0) tspan.attr("x", 0).attr("dy", "15");
  }
};

const findMax = a => {
  if (a.length) {
    let max = 0;
    for (let i = 0; i < a.length; i++) {
      if (a[i] > max) {
        max = a[i];
      }
    }
    return max;
  } else {
    return null;
  }
};

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

const StatisticsComp = ({ user }) => {
  const [statSelectValue, setStatSelectValue] = useState(
    "Number of tickets submitted"
  );
  console.log(statSelectValue);
  const [rangeSelectValue, setRangeSelectValue] = useState("Past 7 Days");

  let tickets = useCollection("tickets", "submitTime", [
    {
      param: "submitTime",
      op: ">",
      val: subDays(startOfDay(new Date()), 31)
    }
  ]);

  useEffect(() => {
    // NOTE: This useEffect is only done the FIRST TIME component appears
    // and its function is to initialise unchanging d3 defaults

    // Initialize dimensions
    graphWidth = 1300;
    graphHeight = 360;

    // Initialize svg and groups
    svg = d3Select(".canvas")
      .append("svg")
      .attr("width", 1360)
      .attr("height", graphHeight + 80);
    // .style("border", "1px solid green");

    // // Graph group
    graph = svg
      .append("g")
      .attr("width", graphWidth)
      .attr("height", graphHeight)
      .attr("transform", `translate(${35}, 25)`);

    // // Axes groups
    xAxisGroup = svg
      .append("g")
      .attr("transform", `translate(${35}, ${graphHeight + 25})`);

    yAxisGroup = svg.append("g").attr("transform", `translate(${35}, ${25})`);

    // // Initialize dotted lines group
    dottedLines = graph
      .append("g")
      .attr("class", "dotted-lines")
      .style("opacity", 0);

    xDottedLine = dottedLines
      .append("line")
      .attr("stroke", "#bcccdc")
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", 4);

    yDottedLine = dottedLines
      .append("line")
      .attr("stroke", "#bcccdc")
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", 4);

    // Initialize scale ranges
    x = scaleBand().range([0, graphWidth]);
    y = scaleLinear().range([graphHeight, 0]);
  }, []);

  useEffect(() => {
    // NOTE: This useEffect is equivalent to d3's update function
    // and updates d3 viz everytime state changes

    // Manual Exit (since D3's exit isn't working)
    document.querySelectorAll(".pointLines").forEach(line => {
      line.remove();
    });
    document.querySelectorAll("circle").forEach(circle => {
      circle.remove();
    });
    document.querySelectorAll("line.horizontalGrid").forEach(line => {
      line.remove();
    });

    // Initialize scales based on range selection
    switch (rangeSelectValue) {
      case "Past 30 Days":
        daysBack = 30;
        break;
      default:
        daysBack = 7;
        let filteredTickets = [];
        filteredTickets = tickets.flatMap(ticket => {
          if (
            Math.abs(
              daysDifference(startOfDay(ticket.submitTime.toDate()), new Date())
            ) > 7
          ) {
            return [];
          } else {
            return ticket;
          }
        });
        tickets = filteredTickets;
        break;
    }

    yAxis = axisLeft(y).ticks(4);

    if (user && tickets.length) {
      index = 0;
      bandsDict = {};
      bands = [];
      eachDayOfInterval({
        start: subDays(startOfDay(new Date()), daysBack),
        end: startOfDay(new Date())
      }).forEach(date => {
        const identifier = date.getMonth() + 1 + "-" + date.getDate();
        bandsDict[identifier] = index;
        bands.push({
          identifier,
          // value: 0
          value: [0]
        });
        index++;
      });

      x.domain(
        bands.map(band => {
          return band.identifier;
        })
      );

      // console.log(bandsDict, bands);

      xAxis = axisBottom(x).tickFormat(t => {
        let date = t.split("-");
        if (date[1] === "1") {
          return date[1] + " " + months[parseInt(date[0], 10) - 1];
        } else {
          return date[1];
        }
      });

      // Step 1: Join data
      // // Set up data
      userTickets = tickets.filter(ticket => {
        return user.config.groups.includes(ticket.group);
      });

      switch (statSelectValue) {
        default:
          // userTickets.forEach(ticket => {
          //   const identifier =
          //     ticket.submitTime.toDate().getMonth() +
          //     1 +
          //     "-" +
          //     ticket.submitTime.toDate().getDate();

          //   if (bandsDict[identifier] + 1) {
          //     bands[bandsDict[identifier]].value += 1;
          //   }
          // });

          bands = bands.map(band => {
            return {
              ...band,
              value: [0, 0]
            };
          });
          userTickets.forEach(ticket => {
            const identifier =
              ticket.submitTime.toDate().getMonth() +
              1 +
              "-" +
              ticket.submitTime.toDate().getDate();

            if (bandsDict[identifier] + 1) {
              bands[bandsDict[identifier]].value[0] += 1;
              if (ticket.resolutionTime) {
                bands[bandsDict[identifier]].value[1] += 1;
              }

              // console.log(
              //   identifier,
              //   bands[bandsDict[identifier]].value,
              //   bands[bandsDict["4-7"]].value
              // );
            }
          });
          break;
        case "Tickets submitted by Group (abs)":
          const groupsCount = {};
          userTickets.forEach(ticket => {
            if (groupsCount[ticket.group]) {
              groupsCount[ticket.group] += 1;
            } else {
              groupsCount[ticket.group] = 1;
            }
          });
          console.log("GROUPS COUNT: ", groupsCount);
          let newValue = [0];
          for (let i = 0; i < user.config.groups.length - 1; i++) {
            newValue.push(0);
          }
          bands = bands.map(band => {
            return {
              ...band,
              value: JSON.parse(JSON.stringify(newValue))
            };
          });

          userTickets.forEach(ticket => {
            const identifier =
              ticket.submitTime.toDate().getMonth() +
              1 +
              "-" +
              ticket.submitTime.toDate().getDate();

            if (bandsDict[identifier] + 1) {
              bands[bandsDict[identifier]].value[
                user.config.groups.findIndex(group => {
                  return group === ticket.group;
                })
              ] += 1;

              // console.log(
              //   identifier,
              //   ticket.group,
              //   bands[bandsDict[identifier]].value,
              //   bands[bandsDict["4-7"]].value
              // );
            }
          });
          console.log("BANDS: ", bands);
          break;
        case "Median first response time (minutes)":
          const firstResponseTimes = [];
          userTickets.forEach(ticket => {
            const identifier =
              ticket.submitTime.toDate().getMonth() +
              1 +
              "-" +
              ticket.submitTime.toDate().getDate();
            if (ticket.firstResponseTime) {
              firstResponseTimes.push(
                (ticket.firstResponseTime.toDate() -
                  ticket.submitTime.toDate()) /
                  60000
              );
              firstResponseTimes.sort();
            }
            if (bandsDict[identifier] + 1) {
              bands[bandsDict[identifier]].value[0] = findMedian(
                firstResponseTimes
              );
            }
          });
          for (let i = 0; i < bands.length; i++) {
            if (!bands[i].value[0] && bands[i - 1]) {
              bands[i].value[0] = bands[i - 1].value[0];
            }
          }
          break;
        case "Median resolution time (hours)":
          const resolutionTimes = [];
          userTickets.forEach(ticket => {
            const identifier =
              ticket.submitTime.toDate().getMonth() +
              1 +
              "-" +
              ticket.submitTime.toDate().getDate();
            if (ticket.resolutionTime) {
              resolutionTimes.push(
                (ticket.resolutionTime.toDate() - ticket.submitTime.toDate()) /
                  3600000
              );
              resolutionTimes.sort();
            }
            if (bandsDict[identifier] + 1) {
              bands[bandsDict[identifier]].value[0] = findMedian(
                resolutionTimes
              );
            }
          });
          for (let i = 0; i < bands.length; i++) {
            if (!bands[i].value[0] && bands[i - 1]) {
              bands[i].value[0] = bands[i - 1].value[0];
            }
          }
          break;
        case "Mean ticket satisfaction":
          const satisfactionNumbers = [];
          userTickets.forEach(ticket => {
            const identifier =
              ticket.submitTime.toDate().getMonth() +
              1 +
              "-" +
              ticket.submitTime.toDate().getDate();
            if (ticket.satisfaction) {
              satisfactionNumbers.push(ticket.satisfaction);
            }
            if (bandsDict[identifier] + 1) {
              bands[bandsDict[identifier]].value[0] = satisfactionNumbers.length
                ? satisfactionNumbers.reduce((acc, current) => {
                    return acc + current;
                  }) / satisfactionNumbers.length
                : 0;
            }
          });
          for (let i = 0; i < bands.length; i++) {
            if (!bands[i].value[0] && bands[i - 1]) {
              bands[i].value[0] = bands[i - 1].value[0];
            }
          }
          break;
      }

      // NEW JOIN PROCESS
      const dataArray = [];
      for (let i = 0; i < bands[0].value.length; i++) {
        const bandsGroup = bands.map(band => {
          return {
            ...band,
            value: band.value[i]
          };
        });

        const dataLines = bandsGroup.map((datum, index) => {
          if (bandsGroup[index + 1]) {
            return {
              start: datum,
              end: bandsGroup[index + 1]
            };
          } else {
            return {
              start: datum,
              end: datum
            };
          }
        });

        const yMax = d3Max(bandsGroup, d => d.value);

        dataArray.push({
          bandsGroup,
          dataLines,
          yMax
        });
      }

      y.domain([0, d3Max(dataArray, d => d.yMax)]);

      for (let i = 0; i < dataArray.length; i++) {
        const points = graph
          .selectAll(`circle.circle-group-${i}`)
          .data(dataArray[i].bandsGroup);
        const lines = graph
          .selectAll(`line.pointLines.line-group-${i}`)
          .data(dataArray[i].dataLines);

        lines
          .enter()
          .append("line")
          .attr("class", `pointLines line-group-${i}`)
          .attr("x1", d => x(d.start.identifier))
          .attr("y1", d => y(d.start.value))
          .attr("x2", d => x(d.start.identifier))
          .attr("y2", d => y(d.start.value))
          .attr("stroke", colors[i])
          .attr("stroke-width", 3)
          .attr("transform", `translate(${x.bandwidth() / 2}, 0)`)
          .transition()
          .duration(150)
          .delay((d, i) => i * 50)
          .attr("x2", d => x(d.end.identifier))
          .attr("y2", d => y(d.end.value));

        points
          .enter()
          .append("circle")
          .attr("class", `circle-group-${i}`)
          .attr("r", 4)
          .attr("cx", d => x(d.identifier))
          .attr("cy", d => y(d.value))
          .attr("fill", "#d5dfe9")
          .attr("transform", `translate(${x.bandwidth() / 2}, 0)`);
      }

      // const dataLines = bands.map((datum, index) => {
      //   if (bands[index + 1]) {
      //     return {
      //       start: datum,
      //       end: bands[index + 1]
      //     };
      //   } else {
      //     return {
      //       start: datum,
      //       end: datum
      //     };
      //   }
      // });

      // //  Join them!
      // const points = graph.selectAll("circle").data(bands);
      // const lines = graph.selectAll("line.pointLines").data(dataLines);

      // Step 2a: Set domains of axes scales
      // y.domain([0, d3Max(bands, d => d.value)]);

      // Step 2c: Call axes from axes groups
      xAxisGroup.call(xAxis);
      yAxisGroup.call(yAxis);

      xAxisGroup
        .selectAll("path")
        .attr("stroke", "#5281ad")
        .attr("stroke-width", 3);
      xAxisGroup.selectAll("text").attr("fill", "#334e68");
      xAxisGroup.selectAll("line").attr("stroke", "#98b3cd");
      xAxisGroup.selectAll("text").each(insertLinebreaks);

      yAxisGroup.selectAll("path").attr("stroke", "none");
      yAxisGroup.selectAll("line").attr("stroke", "none");
      yAxisGroup.selectAll("text").attr("fill", "#334e68");

      graph
        .selectAll("line.horizontalGrid")
        .data(y.ticks(yAxisGroup.selectAll("line")._groups[0].length))
        .enter()
        .append("line")
        .attr("class", "horizontalGrid")
        .attr("x1", 0)
        .attr("x2", graphWidth)
        .attr("y1", d => y(d))
        .attr("y2", d => y(d))
        .attr("stroke", "#98b3cd")
        .attr("stroke-width", 3)
        .attr("opacity", 0.1);

      // Step 3: Exit (Ain't working for whatever reason)
      // lines.exit().remove();
      // points.exit().remove();

      // Step 4: Enter
      // lines
      //   .enter()
      //   .append("line")
      //   .attr("class", "pointLines")
      //   .attr("x1", d => x(d.start.identifier))
      //   .attr("y1", d => y(d.start.value))
      //   .attr("x2", d => x(d.start.identifier))
      //   .attr("y2", d => y(d.start.value))
      //   .attr("stroke", "#febc12")
      //   .attr("stroke-width", 3)
      //   .attr("transform", `translate(${x.bandwidth() / 2}, 0)`)
      //   .transition()
      //   .duration(150)
      //   .delay((d, i) => i * 50)
      //   .attr("x2", d => x(d.end.identifier))
      //   .attr("y2", d => y(d.end.value));

      // points
      //   .enter()
      //   .append("circle")
      //   .attr("r", 4)
      //   .attr("cx", d => x(d.identifier))
      //   .attr("cy", d => y(d.value))
      //   .attr("fill", "#d5dfe9")
      //   .attr("transform", `translate(${x.bandwidth() / 2}, 0)`);

      // Step 6: Attach events
      graph
        .selectAll("circle")
        .on("mouseover", function(d, i, n) {
          // tip
          // const current_position = mouse(this);
          // var tooltipDiv = document.getElementById("tooltip");
          // tooltipDiv.innerHTML = d.id;
          // tooltipDiv.style.top = current_position[1] + "px";
          // tooltipDiv.style.left = current_position[0] + "px";
          // tooltipDiv.style.display = "block";
          // d3Select(this).style("fill", "red");

          const rawDate = d.identifier.split("-");
          const shownDate = rawDate[1] + " " + months[rawDate[0] - 1];
          let valueLabel = "";
          switch (statSelectValue) {
            case "Median first response time (minutes)":
              valueLabel = "Time (mins)";
              break;
            case "Median resolution time (hours)":
              valueLabel = "Time (hours)";
              break;
            case "Mean ticket satisfaction":
              valueLabel = "Satisfaction";
              break;
            default:
              valueLabel = "No. submitted";
              break;
          }

          document.querySelector("#tooltip").style.display = "inline-flex";
          const currentPosition = mouse(this);
          document.querySelector("#tooltip").style.top =
            currentPosition[1] + 215 + "px";
          switch (rangeSelectValue) {
            case "Past 30 Days":
              document.querySelector("#tooltip").style.left =
                currentPosition[0] + 21 + "px";
              break;
            default:
              document.querySelector("#tooltip").style.left =
                currentPosition[0] + 81 + "px";
              break;
          }
          document.querySelector("#tooltip").innerHTML = `
            <span>
              <p><span>Date</span></p>
              <p><span>${valueLabel}</span></p>
            </span>
            <span>
              <p>${" "}<span>:</span>${"  " + shownDate}</p>
              <p>${" "}<span>:</span>${"  " +
            Math.round(d.value * 100) / 100}</p>
            </span>
          `;

          // <p><span>Date</span>: ${shownDate}</p>
          // <p><span>${valueLabel}</span>: ${Math.round(d.value * 100) /
          // 100}</p>
          d3Select(n[i])
            .transition()
            .duration(100)
            .attr("r", 8)
            .attr("fill", "#bcccdc");

          dottedLines.style("opacity", 1);

          xDottedLine
            .attr("x1", 0)
            .attr("y1", y(d.value))
            .attr("x2", x(d.identifier) + x.bandwidth() / 2)
            .attr("y2", y(d.value));

          yDottedLine
            .attr("x1", x(d.identifier))
            .attr("y1", graphHeight)
            .attr("x2", x(d.identifier))
            .attr("y2", y(d.value))
            .attr("transform", `translate(${x.bandwidth() / 2}, 0)`);
        })
        .on("mouseout", (d, i, n) => {
          // tip
          // d3Select(this).style("fill", "white");
          // var tooltipDiv = document.getElementById("tooltip");
          // tooltipDiv.style.display = "none";

          document.querySelector("#tooltip").style.display = "none";

          d3Select(n[i])
            .transition()
            .duration(100)
            .attr("r", 4)
            .attr("fill", "#ccc");

          dottedLines.style("opacity", 0);
        });
    }
  }, [user, tickets, rangeSelectValue, statSelectValue]);

  return (
    <Statistics>
      <StatisticsTitle>
        Your Statistics at a Glance, {user && user.name}
      </StatisticsTitle>
      <StatisticsSelect
        statSelectValue={statSelectValue}
        rangeSelectValue={rangeSelectValue}
        setStatSelectValue={setStatSelectValue}
        setRangeSelectValue={setRangeSelectValue}
      />
      <StatisticsLegend
        user={user}
        colors={colors}
        statSelectValue={statSelectValue}
      />
      <Tooltip id="tooltip" />
      <Canvas className="canvas" />
    </Statistics>
  );
  // return (
  //   <div style={{ marginLeft: "4rem", fontSize: "1.6rem" }}>
  //     Work in Progress!
  //   </div>
  // );
};

export default StatisticsComp;
