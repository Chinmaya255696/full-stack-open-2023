import { useState, useEffect } from "react";
import "./index.css";
import axios from "axios";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import PhoneBookService from "./Services/PhoneBook.js";
import Notification from "./components/Notification.jsx";

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [notification, setNotification] = useState(null);

  const hook = () => {
    console.log("effect");

    const fetchData = async () => {
      try {
        const data = await PhoneBookService.getAll();
        console.log("Data Recevied:", data);
        setPersons(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  };
  console.log("render", persons.length, "persons");
  useEffect(hook, []);

  const handleAdd = async (event) => {
    event.preventDefault();
    const existingPerson = persons.find((person) => person.name === newName);

    if (existingPerson) {
      // If person already exists, show a confirmation alert
      const confirmed = window.confirm(
        `${newName} already exists. Do you want to update the number?`
      );
      if (confirmed) {
        try {
          const updatedPerson = { ...existingPerson, number: newNumber };
          await axios.put(
            `http://localhost:3000/api/persons/${existingPerson._id}`,
            updatedPerson
          );
          setPersons(
            persons.map((person) =>
              person._id === existingPerson._id ? updatedPerson : person
            )
          );
          setNotification(
            <>
              <strong>{updatedPerson.name}</strong> Number is Changed to{" "}
              <strong>{updatedPerson.number}</strong>
            </>
          );
          setTimeout(() => {
            setNotification(null);
          }, 6000);
         } catch (error) {
        //   setNotification(
        //     <>
        //       Information of <strong>{existingPerson.name}</strong>is already
        //       remove from the Server,
        //     </>
        //   );
        //   // Change the notification color to red
        //   document.querySelector(".notification").style.color = "red";
        //   setTimeout(() => {
        //     setNotification(null);
        //     // Reset the color back to green
        //     document.querySelector(".notification").style.color = "green";
        //   }, 6000);
        // }

        console.error("Error adding new person:", error);
        // Handle error response appropriately
        const errorMessage =
          error.response && error.response.data && error.response.data.error
            ? error.response.data.error
            : "Failed to add person due to an unexpected error."; // Fallback message if the error structure is unknown
        
          setNotification(
          
          <>
              <strong style={{ color: "red" }}>Error adding {newName}: {errorMessage} </strong>
          </>
         
          );
        
        setTimeout(() => {
          setNotification(null);
        }, 6000);
      }
      }
    } else {
      // If person doesn't exist, add a new person
      try {
        const newPerson = {
          name: newName,
          number: newNumber,
        };
        const response = await axios.post(
          "http://localhost:3000/api/persons",
          newPerson
        );

        setPersons(persons.concat(response.data));

        setNotification(
          <>
            added <strong> {newPerson.name} </strong> to the PhoneBook
          </>
        );
        setTimeout(() => {
          setNotification(null);
        }, 8000);
      } catch (error) {
       
        console.error("Error adding new person:", error);
        // Handle error response appropriately
        const errorMessage =
          error.response && error.response.data && error.response.data.error
            ? error.response.data.error
            : "Failed to add person due to an unexpected error."; // Fallback message if the error structure is unknown
        
          setNotification(
          
          <>
              <strong style={{ color: "red" }}>Error adding {newName}: {errorMessage} </strong>
          </>
         
          );
        
        setTimeout(() => {
          setNotification(null);
        }, 6000);
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
      <Notification message={notification} />
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
