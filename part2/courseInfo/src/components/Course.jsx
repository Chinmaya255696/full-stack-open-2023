import React from "react";

import Part from "./Part.jsx";
import TotalExercises from "./TotalExercises.jsx";
const Course = ({ course }) => {
  return (
    <div>
      {course.parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}

      <TotalExercises parts={course.parts} />
    </div>
  );
};

export default Course;
