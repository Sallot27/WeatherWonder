import React, { useState, useEffect } from 'react';
import './WeatherForm.css';
import axios from 'axios';

const API_KEY = 'c85bc92956a508e086b7ccfd5147a8e2';
const GEOCODE_API_KEY = '0996c0b3ba2c473bbee1d5c893726165';
const UNSPLASH_ACCESS_KEY = 'mzengiCVh6YmDtpHM0yigo-rTm6ffVsVJPYjmb8Qg-E';

const WeatherForm = () => {
  const [city, setCity] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [cityImage, setCityImage] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWeatherData();
    fetchCityImage();
  }, [latitude, longitude]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (city.trim() !== '') {
      fetchCoordinates();
    } else {
      setError('Please enter a city name.');
    }
  };

  const fetchCoordinates = async () => {
    try {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${GEOCODE_API_KEY}`
      );

      if (response.status === 200) {
        const { lat, lng } = response.data.results[0].geometry;
        setLatitude(lat);
        setLongitude(lng);
        setError(null);
      } else {
        setError('Failed to fetch coordinates.');
      }
    } catch (error) {
      setError('An error occurred while fetching coordinates.');
    }
  };

  const fetchWeatherData = async () => {
    if (!latitude || !longitude) return;

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
      );
      const data = await response.json();

      if (response.ok) {
        setWeatherData(data);
        setError(null);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('An error occurred while fetching weather data.');
    }
  };

  const fetchCityImage = async () => {
    try {
      const response = await axios.get(
        `https://api.unsplash.com/photos/random?query=${city}&client_id=${UNSPLASH_ACCESS_KEY}`
      );

      if (response.status === 200) {
        const imageUrl = response.data.urls.regular;
        setCityImage(imageUrl);
        setError(null);
      } else {
        setError('Failed to fetch city image.');
      }
    } catch (error) {
      setError('An error occurred while fetching city image.');
    }
  };

  return (
    <div className="weather-container">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label htmlFor="cityInput">City:</label>
          <input
            id="cityInput"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
          />
        </div>
        <button type="submit">Get Weather</button>
      </form>

      {error && <p className="error">{error}</p>}
      {weatherData && (
        <div className="weather-card">
          <h2 className="city-name">{city}</h2>
          <div className="weather-details">
            <div className="city-image">
              {cityImage && <img src={cityImage} alt="City" />}
            </div>
            <div className="temperature">
              <p>{Math.round(weatherData.main.temp - 273.15)}°C</p>
            </div>
            <div className="description">
              <p>{weatherData.weather[0].description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherForm;