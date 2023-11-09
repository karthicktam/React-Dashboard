import { Box, alpha } from "@mui/material";

import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { useTheme } from "@emotion/react";

const data = [
  { label: "August", value1: 30, value2: 20 },
  { label: "September", value1: 50, value2: 30 },
  { label: "October", value1: 40, value2: 25 },
  { label: "November", value1: 30, value2: 50 },
  { label: "December", value1: 50, value2: 25 },
  { label: "January", value1: 20, value2: 15 },
];

const colors = (theme) => [
  theme.palette.primary.primary,
  theme.palette.primary.secondary,
];

const Chart = ({ data }) => {
  const svgRef = useRef();
  const [width, setWidth] = useState(0);
  const margin = { top: 20, right: 0, bottom: 40, left: 0 };

  const theme = useTheme();

  useEffect(() => {
    const updateDimensions = () => {
      const containerWidth = svgRef.current.parentElement.clientWidth;
      setWidth(containerWidth);
    };

    // Update dimensions initially and when the window is resized
    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear the previous chart

    if (width === 0) return;

    const stackedData = d3.stack().keys(["value1", "value2"])(data);

    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.label))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(stackedData, (d) => d3.max(d, (d) => d[1]))])
      .nice()
      .range([svgRef.current.clientHeight - margin.bottom, margin.top]);

    const colorScale = d3
      .scaleOrdinal()
      .domain(["value1", "value2"])
      .range([colors(theme)[0], alpha(colors(theme)[1], 0.8)]);

    const barWidth = xScale.bandwidth() * 0.3; // Reduce the width of the bars

    svg
      .selectAll(".bar-group")
      .data(stackedData)
      .enter()
      .append("g")
      .attr("class", "bar-group")
      .attr("fill", (d) => colorScale(d.key))
      .selectAll("rect")
      .data((d) => d)
      .enter()
      .append("rect")
      .attr(
        "x",
        (d) => xScale(d.data.label) + xScale.bandwidth() / 2 - barWidth / 2
      )
      .attr("y", (d) => yScale(d[1]))
      .attr("height", (d) => yScale(d[0]) - yScale(d[1]))
      .attr("width", barWidth)
      .attr("rx", (d) => {
        console.log("value", d);
        return 4;
      })
      .attr("clip-path", "inset(0% 5% 0% 5% round 0px)");

    const xAxis = (g) =>
      g
        .attr(
          "transform",
          `translate(0,${svgRef.current.clientHeight - margin.bottom + 10})`
        )
        .call(d3.axisBottom(xScale).tickSize(0))
        .style("font-size", "13px")
        .style("color", "gray");
    xAxis(svg.append("g").attr("class", "x-axis"));
    svg.select(".x-axis path").style("opacity", 0);
  }, [width]);

  return (
    <div className="chart-container">
      <svg ref={svgRef} width={width} style={{ minHeight: 300 }}></svg>
    </div>
  );
};

function StackedBar() {
  const theme = useTheme();
  return (
    <Box sx={{ bgcolor: "white" }}>
      <Box
        style={{ padding: 15, margin: 0 }}
        display="flex"
        justifyContent={"space-between"}
      >
        <h3>Total Cash Flow</h3>
        <Box display={"flex"} gap={2} flexDirection={"row-reverse"}>
          {colors(theme).map((c, index) => {
            return (
              <Box display={"flex"} gap={1} alignItems={"center"} key={index}>
                <Box
                  sx={{ bgcolor: c, borderRadius: 1 }}
                  width={18}
                  height={18}
                ></Box>
                <Box class="dark">{index === 0 ? "out" : "in"}</Box>
              </Box>
            );
          })}
        </Box>
      </Box>
      <hr />

      <Chart data={data} />
    </Box>
  );
}

export default StackedBar;
