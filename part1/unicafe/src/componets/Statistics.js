// Statistics.js
import React from "react";

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const average = (good - bad) / all || 0;
  const positivePercentage = (good / all) * 100 || 0;

  return (
    <div>
      <h2>Statistics</h2>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>All: {all}</p>
      <p>Average: {average.toFixed(2)}</p>
      <p>Positive Percentage: {positivePercentage.toFixed(2)}%</p>
    </div>
  );
};

export default Statistics;
