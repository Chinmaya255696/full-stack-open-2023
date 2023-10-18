import React, { useState } from "react";

const Header = ({ title }) => {
  return <h1>{title}</h1>;
};


function App() {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodButton = () => {
    setGood(good + 1);
  };

  const handleNeutralButton = () => {
    setNeutral(neutral + 1);
  };
  const handleBadButton = () => {
    setBad(bad + 1);
  };

  return (
    <>
      <Header title="give feedback" />
      <button onClick={handleGoodButton}>Good</button>{" "}
      <button onClick={handleNeutralButton}>neutral</button>{" "}
      <button onClick={handleBadButton}>bad</button>
      <Header title="statistics" />
      good {good}
      <br />
      neutral {neutral}
      <br />
      bad {bad}
    </>
  );
}

export default App;
