import React, { useState } from "react";

const Header = ({ title }) => {
  return <h1>{title}</h1>;
};

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

function App() {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleButtonClick = (feedback) => {
    if (feedback === "good") {
      setGood(good + 1);
    } else if (feedback === "neutral") {
      setNeutral(neutral + 1);
    } else if (feedback === "bad") {
      setBad(bad + 1);
    }
  };
  const all = good + neutral + bad;

   // Calculate the average, considering "neutral" as a value of 0
   const average = (good - bad) / all || 0;

    // Calculate the percentage of "good" reviews
  const positive = (good / all) * 100 || 0;
  return (
    <>
      <Header title="give feedback" />
      <Button text="Good" color="green" onClick={() => handleButtonClick("good")}/>{" "}
      <Button  text="Neutral" color="gray" onClick={() => handleButtonClick("neutral")}/> {" "}
      <Button text="Bad" color="red" onClick={() => handleButtonClick("bad")}/>
      <Header title="statistics" />
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {all}</p>
      <p>average {average.toFixed(2)}</p>
      <p>positive {positive.toFixed(2)}%</p>
    </>
  );
}

export default App;
