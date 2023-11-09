import { useTheme } from "@emotion/react";
import React from "react";
import { curveCardinal, line, select, scaleLinear, axisBottom } from "d3";

function generateRandomData() {
  const lineChartData = {
    Manage: [],
    Auto: [],
    January: [],
    February: [],
    March: [],
    April: [],
    May: [],
    June: [],
    July: [],
    August: [],
    September: [],
    October: [],
    November: [],
    December: [],
  };

  for (const category of Object.keys(lineChartData)) {
    const categoryData = [];
    for (let i = 0; i < 12; i++) {
      const randomValue = Math.floor(Math.random() * 91) + 10;
      categoryData.push(randomValue);
    }
    lineChartData[category] = categoryData;
  }

  return lineChartData;
}

function LineChart({ selectedAccount, selectedMonth }) {
  const theme = useTheme();

  const lineRef = React.useRef(null);

  const lineChartData = React.useMemo(() => generateRandomData(), []);

  const [lineData, setLineData] = React.useState([
    20, 30, 45, 60, 20, 100, 40, 30, 55, 20,
  ]);

  React.useEffect(() => {
    setLineData(lineChartData[selectedMonth]);
  }, [selectedMonth]);

  React.useEffect(() => {
    setLineData(lineChartData[selectedAccount]);
  }, [selectedAccount]);

  React.useEffect(() => {
    const lineSvg = select(lineRef?.current);

    const xScale = scaleLinear()
      .domain([0, Math.max(...lineData)])
      .range([10, lineRef?.current?.clientWidth - 10]);

    lineSvg
      .select(".x-axis")
      .style(
        "transform",
        `translateY(${lineRef?.current?.clientHeight - 20}px)`
      )
      .style("color", "gray")
      .style("font-size", "13px")
      .call(axisBottom(xScale).tickSize(0));

    const yScale = scaleLinear()
      .domain([0, Math.max(...lineData)])
      .range([lineRef?.current?.clientHeight, 10]);

    const linePath = line()
      .x((value, index) => xScale(index * 20))
      .y(yScale)
      .curve(curveCardinal);

    lineSvg.selectAll("path,line").remove();

    lineSvg
      .selectAll(".line")
      .data([lineData])
      .join("path")
      .attr("class", "line")
      .attr("d", linePath)
      .attr("fill", "none")
      .attr("stroke", theme.palette.primary.primary)
      .attr("stroke-width", 2);
  }),
    [lineData];

  return (
    <svg ref={lineRef} style={{ width: "100%", minHeight: 300 }}>
      <g className="x-axis" />
    </svg>
  );
}

export default LineChart;
