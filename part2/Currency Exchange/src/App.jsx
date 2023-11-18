import { useEffect, useState } from "react";

import axios from "axios";

function App() {
  const [value, setValue] = useState("")
  const [rates, setRates] = useState({})
  const [currency, setCurrency] = useState(null)
  
  useEffect(() => {
    console.log('effect run, currency is now', currency)
  
    // skip if currency is not defined
    if (currency) {
      console.log('fetching exchange rates...')
      axios
        .get(`https://v6.exchangerate-api.com/v6/1791bcc8f91c02106a0b1177/latest/${currency}`)
        .then(response => {
          setRates(response.data.rates)
        })
        .catch(error => {
          console.error('Error fetching exchange rates:', error);
          // You might want to handle the error, for example, by setting an error state.
        });
    }
  }, [currency])
  
  

  const handleChange= (event) =>{
    setValue(event.target.value)
  }
  const onSearch = (event) => {
    event.preventDefault()
    axios
      .get(`https://open.er-api.com/v6/1791bcc8f91c02106a0b1177/latest/${value}`)
      .then(response => {
        setRates(response.data.rates)
      })
  }
  return (
    <>
      <form onSubmit={onSearch} >
        currency:<input value={value} onChange={handleChange}/>
        <button type="submit">exchange rate</button>
      </form>
      <pre>
        {JSON.stringify(rates, null, 2)}
      </pre>
    </>
  );
}

export default App;
