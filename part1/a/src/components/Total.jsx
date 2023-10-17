import React from "react";

import PropTypes from "prop-types";

const Total = ({ exercises1, exercises2, exercises3 }) => {
  return (
    <div>
      <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
    </div>
  );
};

Total.propTypes = {
  exercises1: PropTypes.number.isRequired,

  exercises2: PropTypes.number.isRequired,

  exercises3: PropTypes.number.isRequired,
};

export default Total;
