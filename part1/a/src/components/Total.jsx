import React from "react";

const Total = ({ parts }) => {
  console.log(parts);
  return (
    <div>
      <p>
        Number of exercises{" "}
        {parts.reduce((total, parts) => total + parts.exercises, 0)}
      </p>
    </div>
  );
};

export default Total;
