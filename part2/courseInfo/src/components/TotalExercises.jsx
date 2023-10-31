import React from "react";

const TotalExercises = ({ parts }) => {
  const totalExercises = parts.reduce(
    (total, part) => total + part.exercises,
    0
  );

  return <p>Total exercises: {totalExercises} exercises.</p>;
};

export default TotalExercises;
