

import React from "react";

const PersonForm = ({
  newName,
  newNumber,
  handleAdd,
  handleSetNewName,
  handleSetNewNumber,
}) => {
  return (
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
  );
};

export default PersonForm;
