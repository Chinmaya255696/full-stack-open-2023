// src/App.js
import React, { useState, useEffect } from "react";
import axios from "axios";

function CountryInfoApp() {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [expandedCountry, setExpandedCountry] = useState(null);

  const [weather, setWeather] = useState(null);

  const apiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://restcountries.com/v3.1/name/${search}`
        );
        const data = response.data;
        console.log(data[0].capital);
        setCountries(data);

        //fetch Weather Data
        const weatherResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${data[0].capital}&appid=${apiKey}`
        );

        const weatherData = weatherResponse.data;
        console.log(weatherData);
        setWeather(weatherData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (search.trim() !== "") {
      fetchData();
    } else {
      setCountries([]);
    }
  }, [search, apiKey]);

  const handleToggleDetails = (index) => {
    setExpandedCountry((preIndex) => (preIndex === index ? null : index));
  };
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
        <div style={{ marginTop: "20px", textAlign: "left" }}>
          <h2>{countries[0].name.common}</h2>
          <p>Capital: {countries[0].capital}</p>
          <p>Area: {countries[0].area} square kilometers</p>
          <p>
            <strong>Languages:</strong>
            <ul style={{ marginTop: "5px", paddingLeft: "20px" }}>
              {Object.values(countries[0].languages).map((language, index) => (
                <li key={index}>{language}</li>
              ))}
            </ul>
          </p>
          <img
            src={countries[0].flags.png}
            alt="Flag"
            style={{ maxWidth: "200px", marginTop: "20px" }}
          />
          {/* Display Weather Information */}
          {weather && (
            <>
              <h3>weather in {weather.name}</h3>
              <p>Tempreture:- {Math.round(weather.main.temp - 273.15)} °C</p>
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt="img loding...."
              />
              <p>Wind:- {weather.wind.speed} m/s</p>
            </>
          )}
        </div>
      )}
      {countries.length > 1 && countries.length <= 10 && (
        <div>
          <ul>
            {countries.map((country, index) => (
              <li key={index}>
                {country.name.common}
                <button onClick={() => handleToggleDetails(index)}>
                  {expandedCountry === index ? "hide" : "show"}
                </button>

                {expandedCountry === index && (
                  <div style={{ marginTop: "20px", textAlign: "left" }}>
                    <h2>{country.name.common}</h2>
                    <p>Capital: {country.capital}</p>
                    <p>Area: {country.area} square kilometers</p>
                    <p>
                      <strong>Languages:</strong>
                      <ul style={{ marginTop: "5px", paddingLeft: "20px" }}>
                        {Object.values(country.languages).map(
                          (language, index) => (
                            <li key={index}>{language}</li>
                          )
                        )}
                      </ul>
                    </p>
                    <img
                      src={country.flags.png}
                      alt="Flag"
                      style={{ maxWidth: "200px", marginTop: "20px" }}
                    />
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {countries.length > 10 && (
        <p style={{ color: "red", marginTop: "20px" }}>
          Too Many matches, Please Specify another Filter
        </p>
      )}
    </div>
  );
}

export default CountryInfoApp;
