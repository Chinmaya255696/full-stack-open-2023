import React from "react";
import "./CourseInfo.css";
import Course from "./Course";

const CourseInfo = ({ courses }) => {
  console.log(courses);

  return (
    <>
      <h1>CourseInfo</h1>
      {courses.map((course) => (
        <div key={course.id}>
          <h2>{course.name}</h2>
          <Course course={course} />
        </div>
      ))}
    </>
  );
};

export default CourseInfo;
