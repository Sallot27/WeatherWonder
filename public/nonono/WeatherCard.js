import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCurrentWeather } from './api';

const WeatherCard = () => {
  const { location } = useParams();
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWeatherData(location);
  }, [location]);

  const fetchWeatherData = async (location) => {
    try {
      const data = await getCurrentWeather(location);
      setWeatherData(data);
      setError(null);
    } catch (error) {
      setError('Error fetching weather data');
    }
  };

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData(city);
    setCity('');
  };

  const handleButtonClick = () => {
    // Perform desired functionality
    alert("You clicked the extra button!");
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  const { location: { name }, current: { temp_c, condition } } = weatherData;

  return (
    <div>
      <h2>{name}</h2>
      <p>Temperature: {temp_c}°C</p>
      <p>Condition: {condition.text}</p>

      <form onSubmit={handleFormSubmit}>
        <input type="text" value={city} onChange={handleInputChange} placeholder="Enter city" />
        <button type="submit">Get Weather</button>
      </form>

      <button onClick={handleButtonClick}>Extra Button</button>
    </div>
  );
};

export default WeatherCard;