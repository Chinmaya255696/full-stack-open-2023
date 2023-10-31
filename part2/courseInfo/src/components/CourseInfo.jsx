
import React from 'react'
import "./CourseInfo.css"
const Part = ({part})=>{
  console.log(part)
return(
  <div>
    {part.name} {part.exercises}
  </div>
)
}

const CourseInfo = ({courses}) => {
  console.log(courses)

  return (
    <>
    <h1>CourseInfo</h1>
    {courses.map((course) =>(
      <div key={course.id}>
      <h2>{course.name}</h2>
      {course.parts.map((part)=>(
        <Part key={part.id} part = {part}/>
      ))}
      <p>total exercises  for {course.name} : {course.parts.reduce((total, part) => total + part.exercises , 0)} exercises.</p>
      </div>
    ))
      
    }
    </>
    
  )
}

export default CourseInfo;