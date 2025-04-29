import React, { useState } from "react";
import "./weather.css";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY; 

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const fetchWeather = async () => {
    if (!city) return;

    try {
      console.log(`Fetching weather for: ${city}`);
      const res = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(city)}&aqi=no`
      );

      const data = await res.json();
      console.log("API Response:", data);

      if (res.status !== 200 || data.error) {
        const errorMessage = data.error ? data.error.message : "City not found";
        alert(errorMessage);
        setWeather(null);
      } else {
        setWeather(data);
      }
    } catch (error) {
      alert("Error fetching data: " + error.message);
      console.error("Fetch error:", error);
      setWeather(null);
    }
  };

  return (
    <div className="app">
      <div className="app-header">
        <h1>
          <span className="weather-icon">🌤</span>
          Weather App
        </h1>
      </div>

      <div className="search">
        <div className="search-container">
          <input
            type="text"
            placeholder="Enter city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && fetchWeather()}
          />
          <button onClick={fetchWeather}>
            <span className="search-icon">🔍</span>
            <span className="search-text">Search</span>
          </button>
        </div>
      </div>

      {weather ? (
        <div className="card">
          <div className="location-info">
            <h2>{weather.location.name}, {weather.location.country}</h2>
            <p className="date">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>

          <div className="weather-info">
            <div className="weather-condition">
              <img
                src={weather.current.condition.icon}
                alt={weather.current.condition.text}
                className="condition-icon"
              />
              <h3>{weather.current.condition.text}</h3>
            </div>

            <div className="temperature">
              <span className="temp-value">{Math.round(weather.current.temp_c)}</span>
              <span className="temp-unit">°C</span>
            </div>
          </div>

          <div className="weather-details">
            <div className="detail-item">
              <span className="detail-icon">🌡️</span>
              <div className="detail-info">
                <span className="detail-label">Feels like</span>
                <span className="detail-value">{Math.round(weather.current.feelslike_c)}°C</span>
              </div>
            </div>

            <div className="detail-item">
              <span className="detail-icon">💧</span>
              <div className="detail-info">
                <span className="detail-label">Humidity</span>
                <span className="detail-value">{weather.current.humidity}%</span>
              </div>
            </div>

            <div className="detail-item">
              <span className="detail-icon">🌬️</span>
              <div className="detail-info">
                <span className="detail-label">Wind</span>
                <span className="detail-value">{weather.current.wind_kph} km/h</span>
              </div>
            </div>

            <div className="detail-item">
              <span className="detail-icon">👁️</span>
              <div className="detail-info">
                <span className="detail-label">Visibility</span>
                <span className="detail-value">{weather.current.vis_km} km</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <p>Enter a city name to get the weather information</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
