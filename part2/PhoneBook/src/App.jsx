import { useState } from "react";

function App() {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);

  const [newName, setNewName] = useState("");

  const handleAdd = (event) => {
    event.preventDefault();
    const personObject = { name: newName };

    const isPresent = persons.some(
      (person) => person.name === personObject.name
    );
    isPresent
      ? alert(`${newName} is already present in the PhoneBook.`)
      : setPersons(persons.concat(personObject));
    setNewName("");
  };
  const handleSetNewName = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  return (
    <>
      <h1>PhoneBook</h1>
      <form>
        <p>
          name:
          <input value={newName} onChange={handleSetNewName} />
        </p>
        <button type="submit" onClick={handleAdd}>
          add
        </button>
      </form>
      <h1>Numbers</h1>
      {persons.map((person) => (
        <div key={person.id}>{person.name}</div>
      ))}
    </>
  );
}

export default App;
