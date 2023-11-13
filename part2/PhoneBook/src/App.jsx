import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import PhoneBookService from "./Services/PhoneBook.js"

function App() {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const hook = () =>{
    console.log("effect")

   const fetchData = async () =>{
  try{
   const data = await PhoneBookService.getAll();
   console.log("Data Recevied:", data);
   setPersons(data)
  }catch(error){
    console.error("Error fetching data:", error);
  }
   }  
   fetchData();
  }
console.log("render", persons.length, "persons");
  useEffect(hook, [])

  const handleAdd = (event) => {
    event.preventDefault();
    const personObject = {
      id: persons.length + 1,
      name: newName,
      number: newNumber,
    };

    const isPresent = persons.some((person) => person.name === personObject.name);
    isPresent
      ? alert(`${newName} is already present in the PhoneBook.`)
      : setPersons(persons.concat(personObject));
     PhoneBookService.create( personObject).then(response => {
      console.log("Promise fulfilled");
      console.log(response)
    } );
    console.log(personObject);
    setPersons(persons.concat(personObject));
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
  };
  const filteredPersons = persons.filter((person) => {
    return person.name.toLowerCase().includes(searchQuery.toLowerCase());
  });
  console.log(filteredPersons);


  return (
    <>
      <h1>PhoneBook</h1>
      <Filter
        searchQuery={searchQuery}
        handleSearchChange={handleSearchChange}
      />
      <h2>add a new</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleAdd={handleAdd}
        handleSetNewName={handleSetNewName}
        handleSetNewNumber={handleSetNewNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} setPersons={setPersons} />
    </>
  );
}

export default App;
