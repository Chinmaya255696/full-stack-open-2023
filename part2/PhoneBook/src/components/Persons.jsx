

import React from "react";
import DeleteButton from "./DeleteButton";
import axios from "axios";

const Persons = ({ persons, setPersons}) => {

  const handleDelete = async (id) => {
  try{
   await axios.delete(`http://localhost:3000/persons/${id}`)
   setPersons(persons.filter(person => person.id !== id))
  }catch(error){
    console.error("Error deleting Entries:", error);
  }
  }
  
  return (
    <div>
      {persons.map((person) => (
        <div key={person.id}>
          <p>name: {person.name}</p>
          <p>mob: {person.mob}</p>
         <DeleteButton id={person.id} onDelete={() => handleDelete(person.id)}/>
        </div>
      ))}
    </div>
  );
};

export default Persons;

