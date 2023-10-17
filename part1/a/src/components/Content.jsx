import React from "react";

const Part = ({ part }) => {
  console.log(part);
  return (
    <div>
      {part.name} {part.exercises}
    </div>
  );
};

const Content = ({ parts }) => {
  console.log(parts);

  return (
    <div>
      <Part part={parts[0]} />
      <Part part={parts[1]} />
      <Part part={parts[2]} />
    </div>
  );
};

export default Content;
