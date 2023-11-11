const Note = ({ note, toggleImportance }) => {
  // console.log(note);
  console.log(toggleImportance);
  const label = note.important
    ? 'make not important' : 'make important'

  return (
    <li>
      {note.content} 
      <button onClick={toggleImportance}>{label}</button>
    </li>
  )
}
  
  export default Note;