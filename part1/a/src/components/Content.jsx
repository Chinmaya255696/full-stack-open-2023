import React from "react";



const Part = ({number}) =>{
  return(
    <div>
     <p> part-:{number} exercises-{number}</p>
    </div>
  )
}

const Content = () => {
  return (
    <div>
      <Part number={1}/>
      <Part number={2}/>
      <Part number={3}/>
    </div>
  );
};



export default Content;
