import React, { useState } from "react";

import Button from "./componets/Button";

import Header from "./componets/Header";

import Statistics from "./componets/Statistics";

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [feedbackGiven, setFeedbackGiven] = useState(false);

  const handleButtonClick = (feedback) => {
    if (feedback === "good") {
      setGood(good + 1);
    } else if (feedback === "neutral") {
      setNeutral(neutral + 1);
    } else if (feedback === "bad") {
      setBad(bad + 1);
    }

    setFeedbackGiven(true);
  };

  return (
    <>
      <Header title="give feedback" />
      <Button
        text="Good"
        color="green"
        onClick={() => handleButtonClick("good")}
      />{" "}
      <Button
        text="Neutral"
        color="gray"
        onClick={() => handleButtonClick("neutral")}
      />{" "}
      <Button text="Bad" color="red" onClick={() => handleButtonClick("bad")} />
      <Header title="statistics" />
      {feedbackGiven ? (
        <Statistics good={good} neutral={neutral} bad={bad} />
      ) : (
        <h2>No feedback Given</h2>
      )}
    </>
  );
}

export default App;
