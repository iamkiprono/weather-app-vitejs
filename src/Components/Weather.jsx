import React, { useEffect, useState } from "react";
import Cloudy from "./Cloudy";
import Sunny from "./Sunny";
import { FaSearch } from "react-icons/fa";

const Weather = () => {
  const [city, setCity] = useState("Elburgon");

  const [accessedCity, setAccessedCity] = useState("");
  const [temp, setTemp] = useState("");
  const [weatherState, setWeatherState] = useState("");
  const [country, setCountry] = useState("");

  const [loading, setLoading] = useState(false);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=b90cd005e4a7dd4e762bc4c161140c14`;

  const getWeather = async () => {
    try {
      setLoading(true);
      const res = await fetch(url);
      const data = await res.json();
      setLoading(false);

      setAccessedCity(data.name);
      setTemp(data.main.temp);
      setWeatherState(data.weather[0].main);
      setCountry(data.sys.country);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getWeather();
  }, []);

  return (
    <div className="weather">
      <div className="weather-wrapper">
        <div className="search-wrapper">
          <input
            onChange={(e) => setCity(e.target.value)}
            type="search"
            placeholder="Search City..."
          />
          <FaSearch  onClick={getWeather} />
        </div>
        <div className="loading-spinner">
          {loading ? <img src="/spinner.svg" alt="" /> : ""}
        </div>
        <div className="top info">
          <h3>
            {accessedCity}
            <span>{country}</span>{" "}
          </h3>

          <p className="temperature">{Math.round(temp)}°C</p>
          <p className="wheather-state">{weatherState}</p>
        </div>
        <div className="bottom info">
          <div className="weather-icon">
            {weatherState === "Clouds" ? <Cloudy /> : <Sunny />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
