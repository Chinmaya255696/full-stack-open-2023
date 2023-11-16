import { useState, useEffect } from "react";
import './index.css'
import axios from "axios";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import PhoneBookService from "./Services/PhoneBook.js"
import Notification from "./components/Notification.jsx";

function App() {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [notification, setNotification] = useState("hy notifications");


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

  const handleAdd = async (event) => {
    event.preventDefault();
    const existingPerson = persons.find((person) => person.name === newName);

    if(existingPerson){
       // If person already exists, show a confirmation alert
       const confirmed = window.confirm(`${newName} already exists. Do you want to update the number?`);
      if (confirmed) {
        try {
          const updatedPerson = { ...existingPerson, number: newNumber };
           await axios.put(`http://localhost:3000/persons/${existingPerson.id}`, updatedPerson);
          setPersons(persons.map(person => (person.id === existingPerson.id ? updatedPerson : person)));
          setNotification(
            <>
            <strong>{updatedPerson.name}</strong> Number is Changed to <strong>{updatedPerson.number}</strong>
            </>
            )
          setTimeout(()=>{
            setNotification(null)
          }, 8000)
        } catch (error) {
          console.error("Error updating phone number:", error);
        }
      }
    } else {
      // If person doesn't exist, add a new person
      try {
        const newPerson = {  id: persons[persons.length-1].id + 1, name: newName, number: newNumber };
        const response = await axios.post("http://localhost:3000/persons", newPerson);

        setPersons(persons.concat(response.data));
       
        setNotification(
          <>
          added <strong> {newPerson.name} </strong>  to the PhoneBook
          </>
          )
        setTimeout(() =>{
          setNotification(null)
        }, 8000)
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
      <Notification message={notification}/>
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
