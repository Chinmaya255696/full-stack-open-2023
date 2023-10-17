import React from "react";

import PropTypes from "prop-types";

const Total = ({ total }) => {
  return (
    <div>
      <p>Number of exercises {total}</p>
    </div>
  );
};

Total.propTypes = {
  exercises1: PropTypes.number.isRequired,

  exercises2: PropTypes.number.isRequired,

  exercises3: PropTypes.number.isRequired,
};

export default Total;
