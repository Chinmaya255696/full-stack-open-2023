import React from 'react'

const DeleteButton = ({id,onDelete}) => {
  
    const handleDelete = () => {
        const confirmed = window.confirm('Are you want to delete this entry?');
     if(confirmed) {
        onDelete(id);
     }        

    }
  return (
    <button onClick={handleDelete} >
        delete
    </button>
  )
}

export default DeleteButton;