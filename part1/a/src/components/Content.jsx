import React from "react";

const Part = (props) => {
  console.log(props)
  return (
    <div>
      {props.part.name} {props.part.exercises}
    </div>
  );
};

const Content = (props) => {
  console.log(props);
  return (
    <div>
      <Part part={props.part1}  />
      <Part part={props.part2}  />
      <Part part={props.part3}  />
    </div>
  );
};

export default Content;
