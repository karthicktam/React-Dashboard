import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { useTheme } from "@emotion/react";

const data = [
  { label: "older", value: 20 },
  { label: "Jan 01-08", value: 40 },
  { label: "Jan 09-16", value: 70 },
  { label: "Jan 17-24", value: 45 },
  { label: "Jan 25-31", value: 55 },
  { label: "Future", value: 30 },
];

const BarChart = () => {
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

    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.label))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)])
      .nice()
      .range([svgRef.current.clientHeight - margin.bottom, margin.top]);

    const barWidth = xScale.bandwidth() * 0.3; // Reduce the width of the bars

    svg
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => xScale(d.label) + xScale.bandwidth() / 2 - barWidth / 2)
      .attr("y", (d) => yScale(d.value))
      .attr("width", barWidth)
      .attr(
        "height",
        (d) => svgRef.current.clientHeight - margin.bottom - yScale(d.value)
      )
      .attr("rx", 4)
      .attr("fill", theme.palette.primary.primary);

    const xAxis = (g) =>
      g
        .attr(
          "transform",
          `translate(0,${svgRef.current.clientHeight - margin.bottom + 25})`
        )
        .call(
          d3
            .axisBottom(xScale)
            .tickSize(0)
            .tickValues(data.map((d) => d.label))
        )
        .style("font-size", "13px")
        .style("color", "gray");

    svg.append("g").attr("class", "x-axis").call(xAxis);
    svg.select("path, x-axis").remove();
  }, [width]);

  return (
    <div className="chart-container">
      <svg ref={svgRef} width={width} style={{ minHeight: 300 }}></svg>
    </div>
  );
};

export default BarChart;
