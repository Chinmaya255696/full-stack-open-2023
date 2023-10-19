import React from "react";
import StatisticLine from "./StatisticsLine";

import "./Statistics.css"

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const average = (good - bad) / all || 0;
  const positivePercentage = (good / all) * 100 || 0;

  return (
    <table>
    <tbody>
    
        <StatisticLine text="Good" value={good} />
        <StatisticLine text="Neutral" value={neutral} />
        <StatisticLine text="Bad" value={bad} />
        <StatisticLine text="All" value={all} />
        <StatisticLine text="Average" value={average.toFixed(2)} />
        <StatisticLine
          text="Positive"
          value={positivePercentage.toFixed(2) + "%"}
        />
     </tbody>
    </table>
  );
};

export default Statistics;
