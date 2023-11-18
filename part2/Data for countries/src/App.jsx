// src/App.js
import React, { useState, useEffect } from "react";
import axios from "axios";

function CountryInfoApp() {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://restcountries.com/v3.1/name/${search}`
        );
        const data = response.data;
        setCountries(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (search.trim() !== "") {
      fetchData();
    } else {
      setCountries([]);
    }
  }, [search]);
  return (
    <div>
      <h1>Country Info App</h1>
      <>
        find counties:
        <input
          type="text"
          placeholder="type your country name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </>
{countries.length === 1 && (
<div>
  <h1>{countries[0].name.common}</h1>
  <p>capital: <strong>{countries[0].capital}</strong></p>
  <p>area: <strong>{countries[0].area}</strong> square kilometers</p>
  <p><strong>languages: 

  {Object.values(countries[0].languages).map((language, index) => (
    <li key={index}>{language}</li>
  ))}
  
  </strong></p>
  <img src={countries[0].flags.png} alt="Flag" style={{ maxWidth: '200px' }} />
</div>
)}
      {countries.length > 1 && countries.length <= 10 && (
        <ul>
          {countries.map((country) => (
            <li key={country.name.common}>{country.name.common}</li>
          ))}
        </ul>
      )}
      {countries.length > 10 && (
        <p style={{ color: 'red' }}>Too Many matches, Please Specify another Filter</p>
      )}
    </div>
  );
}

export default CountryInfoApp;
