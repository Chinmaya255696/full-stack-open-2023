import React from "react";
import StatisticLine from "./StatisticsLine";

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const average = (good - bad) / all || 0;
  const positivePercentage = (good / all) * 100 || 0;

  return (
    <div>
      <StatisticLine text="Good" value={good} />
      <StatisticLine text="Neutral" value={neutral} />
      <StatisticLine text="Bad" value={bad} />
      <StatisticLine text="All" value={all} />
      <StatisticLine text="Average" value={average.toFixed(2)} />
      <StatisticLine text="Positive Percentage" value={positivePercentage.toFixed(2) + "%"} />
    </div>
  );
};

export default Statistics;
