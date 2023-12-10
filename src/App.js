import React from 'react';
import WeatherForm from './WeatherForm';

const App = () => (
  <div>
    <h1>Weather Wonder</h1>
    <p>Welcome to Weather Wonder! Enter the latitude and longitude to see the current weather.</p>
    <WeatherForm />
  </div>
);

export default App;