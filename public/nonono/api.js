import axios from 'axios';

const API_KEY = 'c85bc92956a508e086b7ccfd5147a8e2';

export const getCurrentWeather = async (location) => {
  try {
    const response = await axios.get(
      `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};