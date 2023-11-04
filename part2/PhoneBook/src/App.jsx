 import { useState } from "react";

function App() {
  const [persons, setPersons] = useState([
    { id:1 , name: "Arto Hellas", number: "040-123456" },
  ]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleAdd = (event) => {
    event.preventDefault();
    const personObject = {id:persons.length+1, name: newName , number: newNumber};

    const isPresent = persons.some(
      (person) => person.name === personObject.name
    );
    isPresent
      ? alert(`${newName} is already present in the PhoneBook.`)
      : setPersons(persons.concat(personObject));
    setNewName("");
    setNewNumber("");
  };
  const handleSetNewName = (event) => {
    
    setNewName(event.target.value);
  };

  const handleSetNewNumber = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  return (
    <>
      <h1>PhoneBook</h1>
      <form>
        <p>
          name:
          <input value={newName} onChange={handleSetNewName} />
        </p>
        <p>
          number: <input value={newNumber} onChange={handleSetNewNumber} />
        </p>
        <button type="submit" onClick={handleAdd}>
          add
        </button>
      </form>
      <h1>Numbers</h1>
      {persons.map((person) => (
        <div key={person.id}>
       <p> name:-{person.name} </p>
        <p>mob:-{person.number}</p>
        </div>
      ))}
    </>
  );
}

export default App;