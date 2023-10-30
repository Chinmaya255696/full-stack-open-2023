import React from "react";

const Part = ({ part }) => {
  return (
    <div>
      {part.name} {part.exercises}
    </div>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part, index) => (
        <Part key={index} part={part} />
      ))}
    </div>
  );
};

export default Content;