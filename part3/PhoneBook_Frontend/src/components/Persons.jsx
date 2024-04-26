import DeleteButton from "./DeleteButton";
import axios from "axios";
import { toast } from 'react-toastify'; 

const Persons = ({ persons, setPersons}) => {

  const handleDelete = async (id) => {
    if (!id) {
      toast.error("Error: The ID is undefined.");
      return;
    }
    console.log("Delete called with ID:", id);
  
    try {
      await axios.delete(`http://localhost:3000/api/persons/${id}`);
      setPersons(persons.filter(person => person._id !== id));
      toast.success("Person deleted successfully!");
    } catch (error) {
      console.error("Error deleting Entries:", error);
      toast.error("Failed to delete the person.");
    }
  };
  
  return (
    <div>
      {persons.map((person) => (
        <div key={person._id}>
          <p>name: {person.name}</p>
          <p>mob: {person.number}</p>
          <DeleteButton id={person._id} onDelete={handleDelete}/>
        </div>
      ))}
    </div>
  );
};

export default Persons;
