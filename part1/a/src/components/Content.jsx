import React from "react";

import PropTypes from "prop-types";

const Content = ({
  part1,
  exercises1,
  part2,
  exercises2,
  part3,
  exercises3,
}) => {
  return (
    <div>
      <p>
        {part1} {exercises1}
      </p>
      <p>
        {part2} {exercises2}
      </p>
      <p>
        {part3} {exercises3}
      </p>
    </div>
  );
};

Content.propTypes = {
  part1: PropTypes.string.isRequired,
  exercises1: PropTypes.number.isRequired,
  part2: PropTypes.string.isRequired,
  exercises2: PropTypes.number.isRequired,
  part3: PropTypes.string.isRequired,
  exercises3: PropTypes.number.isRequired,
};

export default Content;
