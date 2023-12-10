import React, { useState } from 'react';
import WeatherCard from '../public/nonono/WeatherCard';

const Home = () => {
  const [location, setLocation] = useState('');

  const handleInputChange = (e) => {
    setLocation(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform any additional logic or API calls here
  };

  return (
    <div>
      <h1>Weather Wonder</h1>
      <p>Welcome to Weather Wonder! Enter a location to see the current weather.</p>

      <form onSubmit={handleSubmit}>
        <input type="text" value={location} onChange={handleInputChange} placeholder="Enter a location" />
        <button type="submit">Get Weather</button>
      </form>

      {location && <WeatherCard location={location} />}
    </div>
  );
};

export default Home;