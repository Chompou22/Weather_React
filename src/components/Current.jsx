import { useState, useEffect } from 'react';
import Search from './Search';
import Forecast from './Forecast';
import { useFetchCurrentQuery } from '../store/index';
import { Card, CardContent, Typography } from '@mui/material';
import { CiLocationOn } from 'react-icons/ci';
import axios from 'axios'; // Make sure to import axios

import './style/current.css';

const Current = () => {
  const [cityName, setCityName] = useState('London');
  const [loading, setLoading] = useState(false);
  const { data, isLoading, isError } = useFetchCurrentQuery(cityName);

  const handleSearchCity = (city) => {
    setCityName(city);
  };

  const kelvinToCelsius = (kelvin) => {
    return kelvin - 273.15;
  };

  // Function to get current user location.
  const getCurrentLocation = () => {
    setLoading(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          fetchWeatherData(lat, lon);
        },
        function (error) {
          alert('Please turn-on your location', error);
          console.error('Error getting geolocation:', error);
          setLoading(false);
        },
      );
    } else {
      console.error('Geolocation is not available.');
      setLoading(false);
    }
  };

  const fetchWeatherData = async (lat, lon) => {
    const apiKey = '852b9c87bd1edf4a8a2de3fc6e00cec9';
    const endpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    try {
      const response = await axios.get(endpoint);
      setCityName(response.data.name); // Update city name
    } catch (error) {
      console.error('Error fetching weather data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch weather data when cityName changes
    if (cityName) {
      fetchWeatherData();
    }
  }, [cityName]);

  return (
    <div className="container">
      <Search handleSearchCity={handleSearchCity} />

      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error fetching data</p>
      ) : data ? (
        <>
          <Card sx={{ background: '#f5f5f5', width: '380px' }}>
            <CardContent>
              <div className="current">
                <div>
                  <img
                    alt="weather"
                    className="icon"
                    src={`icons/${data.weather[0].icon}.svg`}
                  />
                </div>
                <div>
                  <Typography variant="body1">
                    Location:{' '}
                    <CiLocationOn
                      onClick={getCurrentLocation}
                      className="location-icon"
                    />
                    {loading && <p>Loading...</p>}
                  </Typography>
                  <Typography variant="body1">
                    {data.weather[0].description}
                  </Typography>
                  <Typography variant="body1">
                    <div>{data.name}</div>

                    <div>
                      ({kelvinToCelsius(data.main.temp).toFixed(2)}
                      °C)
                    </div>
                  </Typography>
                  <Typography variant="body1">
                    Humidity: {data.main.humidity}%
                  </Typography>
                  <Typography variant="body1">
                    Wind: {data.wind.speed} Km/h
                  </Typography>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="forecast">
            <Forecast lon={data.coord.lon} lat={data.coord.lat} />
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Current;
