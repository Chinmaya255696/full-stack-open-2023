import React from 'react'

const Button = ({ text, color, onClick }) => {
    const buttonStyle = {
      backgroundColor: color,
    };
    return (
        <button style={buttonStyle} onClick={onClick}>
          {text}
        </button>
      );
    };
export default Button;