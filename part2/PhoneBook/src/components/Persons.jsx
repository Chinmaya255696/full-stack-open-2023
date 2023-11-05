

import React from "react";

const Persons = ({ persons }) => {
  return (
    <div>
      {persons.map((person) => (
        <div key={person.id}>
          <p>name: {person.name}</p>
          <p>mob: {person.number}</p>
        </div>
      ))}
    </div>
  );
};

export default Persons;

