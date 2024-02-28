import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    axios
      .get("https://crio-location-selector.onrender.com/countries")
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => {
        console.log("Error fetching countries: ", error);
      });
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      axios
        .get(
          `https://crio-location-selector.onrender.com/country=${selectedCountry}/states`
        )
        .then((response) => {
          setStates(response.data);
          setSelectedState("");
          setCities([]);
          setSelectedCity("");
        })
        .catch((error) => {
          console.log("Error fetching states: ", error);
        });
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedCountry && selectedState) {
      axios
        .get(
          `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`
        )
        .then((response) => {
          setCities(response.data);
          setSelectedCity("");
        })
        .catch((error) => {
          console.log("Error fetching cities: ", error);
        });
    }
  }, [selectedCountry, selectedState]);
  return (
    <div className="city-selector">
      <h1>Select Location</h1>
      <div className="dropdown-container">
        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className="dropdown"
        >
          <option disabled value="">
            Select Country
          </option>
          {countries.map((country) => (
            <option key={country}>{country}</option>
          ))}
        </select>
        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          className="dropdown"
        >
          <option disabled value="">
            Select State
          </option>
          {states.map((state) => (
            <option key={state}>{state}</option>
          ))}
        </select>
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="dropdown"
        >
          <option disabled value="">
            Select City
          </option>
          {cities.map((city) => (
            <option key={city}>{city}</option>
          ))}
        </select>
      </div>
      {/* <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2> */}

      {selectedCity && (
        <h2 className="result">
        You Selected {selectedCity},
        
          {" "}
          {selectedState},{" "}{selectedCountry}
        
      </h2>
      )}
    </div>
  );
}
