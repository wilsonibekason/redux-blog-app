import "./App.css";
import { useState } from "react";
import { fetchWeather } from "./api/fetchWeather";

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const search = async (e) => {
    if (e.key === "Enter") {
      const data = await fetchWeather(query);
      setWeather(data);
      setQuery("");
      console.log(data);
    }
  };

  const onType = (e) => setQuery(e.target.value);
  return (
    <div className="main-container">
      <input
        type="text"
        className="search"
        placeholder="search ..."
        value={query}
        onChange={onType}
        onKeyPress={search}
      />
      {weather.main && (
        <div className="city">
          <h2 className="city">
            <span>{weather.name}</span>
            <sup>{weather.sys.country}</sup>
          </h2>
          <div className="city-temperature">
            {Math.round(weather.main.temp)}
            <sup>&deg:C</sup>
          </div>
          <div className="info">
            <img
              className="city-icon"
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
            <p>{weather.weather[0].description}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
