import { useState, useEffect } from "react";
import noteService from "./services/notes";
import Note from "./components/Note";


const App = () => {
  const [notes, setNotes] = useState([]);

  const [newNote, setNewNote] = useState("");

  const [showAll, setShowAll] = useState(false);

  const hook = () => {
    const fetchData = async () => {
      try {
        const data = await noteService.getAll();
        console.log("Data received:", data);
        setNotes(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  };
  console.log("render", notes.length, "notes");
  useEffect(hook, []);


  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
    .update(id, changedNote)
    .then(returnedNote => {
      setNotes(notes.map(note => note.id !== id ? note : returnedNote))
    })

    .catch(error => {
      alert(
        `the note '${note.content}' was already deleted from server`
      )
      setNotes(notes.filter(n => n.id !== id))
    })
   
  };
  
  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: notes.length + 1,
    };

    noteService.create(noteObject).then((response) => {
      console.log(response);
    });
    console.log(noteObject);
    setNotes(notes.concat(noteObject));
    setNewNote("");
  };
  const handleNotChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  };

 

  return (
    <>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNotChange} />
        <button type="submit">save</button>
      </form>
    </>
  );
};

export default App;
