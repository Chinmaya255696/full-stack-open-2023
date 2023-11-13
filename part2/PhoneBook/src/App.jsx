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
    const existingPerson = persons.find((person) => person.name === newName);

    if(existingPerson){
       // If person already exists, show a confirmation alert
       const confirmed = window.confirm(`${newName} already exists. Do you want to update the number?`);
      if (confirmed) {
        try {
          const updatedPerson = { ...existingPerson, number: newNumber };
           axios.put(`http://localhost:3000/persons/${existingPerson.id}`, updatedPerson);
          setPersons(persons.map(person => (person.id === existingPerson.id ? updatedPerson : person)));
        } catch (error) {
          console.error("Error updating phone number:", error);
        }
      }
    } else {
      // If person doesn't exist, add a new person
      try {
        const newPerson = {  id: persons.length + 1, name: newName, number: newNumber };
        const response =  axios.post("http://localhost:3000/persons", newPerson);
        setPersons([...persons, response.data]);
      } catch (error) {
        console.error("Error adding new person:", error);
      }
    }

   // Clear the input fields
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