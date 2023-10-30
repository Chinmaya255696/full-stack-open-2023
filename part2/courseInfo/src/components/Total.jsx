import React from "react";

import "./Total.css"
const Total = ({ parts }) => {
  console.log(parts);
  let totalExercises = parts.reduce(
    (total, parts) => total + parts.exercises,
    0
  );
  return (
    <div>
      <p>Number of exercises: {totalExercises}</p>
    </div>
  );
};

export default Total;