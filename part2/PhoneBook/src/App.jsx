import { useState } from "react";

function App() {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleAdd = (event) => {
    event.preventDefault();
    const personObject = {
      id: persons.length + 1,
      name: newName,
      number: newNumber,
    };

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
  const handleSearchChange = (event) => {
    console.log(event.target.value);
    setSearchQuery(event.target.value);
  }
  const filteredPersons = persons.filter((person) =>{
    return person.name.toLowerCase().includes(searchQuery.toLowerCase())
  })
  console.log(filteredPersons);
  return (
    <>
      <h1>PhoneBook</h1>
      <p>
        filter Shown With{" "}
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </p>
      <h1>add a new</h1>
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
      {filteredPersons.map((person) => (
        <div key={person.id}>
          <p> name:-{person.name} </p>
          <p>mob:-{person.number}</p>
        </div>
      ))}
    </>
  );
}

export default App;




