// src/components/CountrySelector.js
import React, { useState, useEffect } from "react";
import { fetchCountryList, fetchCurrentTime } from "../api";
import './CountrySelector.css';
const CountrySelector = ({ onSelect }) => {
  const [countries, setCountries] = useState([]);
  const [currentTime, setCurrentTime] = useState("");
  const [offsettime, setOffsettime] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      const countries = await fetchCountryList();
      setCountries(countries);
    };

    fetchCountries();
  }, []);

  const handleCountryChange = async () => {
    if (selectedCountry) {
      // Fetch current time for the selected country
      const time = await fetchCurrentTime(selectedCountry);
      setCurrentTime(time.utc_datetime);
      setOffsettime(time.utc_offset);
      onSelect(time?.utc_datetime);
    }
  };

  useEffect(() => {
    // Fetch time every 60 seconds (adjust the interval as needed)
    const intervalId = setInterval(handleCountryChange, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [selectedCountry]);

  return (
    <div className="country-selector-container">
      <label className="country-selector-label">Select Country</label>
      <select
        className="country-selector-dropdown"
        value={selectedCountry}
        onChange={(e) => setSelectedCountry(e.target.value)}
      >
        <option value="">Select a country</option>
        {countries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>
      <button className="fetch-button"  onClick={handleCountryChange}>Fetch Time</button>
      <h3>Current Time: {currentTime}</h3>
      <h3>Offset Time: {offsettime}</h3>
    </div>
  );
};

export default CountrySelector;
