const DeleteButton = ({ id, onDelete }) => {
  const handleDelete = () => {
    // Confirm before deleting
    const confirmed = window.confirm('Are you sure you want to delete this entry?');
    if (confirmed) {
      onDelete(id);  // Call the onDelete function passed as a prop with the id
    }
  };

  return (
    <button onClick={handleDelete}>
      Delete
    </button>
  );
}

export default DeleteButton;
