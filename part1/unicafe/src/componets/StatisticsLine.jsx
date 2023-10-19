// StatisticLine.js
import React from "react";

import "./StatisticsLine.css"

const StatisticLine = ({ text, value }) => {
  return (
    <>
      <tr>
      <td>{text}:</td> 
      <td>{value}</td>
      </tr>
      </>
  );
};

export default StatisticLine;
