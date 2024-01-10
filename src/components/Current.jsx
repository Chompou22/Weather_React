import { useState } from 'react';
import Search from './Search';
import Forecast from './Forecast';
import { useFetchCurrentQuery } from '../store/index';
import { Card, CardContent, Typography } from '@mui/material';
import './style/current.css';

const Current = () => {
  const [cityName, setCityName] = useState('London');
  const { data, isLoading, isError } = useFetchCurrentQuery(cityName);

  const handleSearchCity = (city) => {
    setCityName(city);
  };

  const kelvinToCelsius = (kelvin) => {
    return kelvin - 273.15;
  };

  return (
    <div className="contianer">
      <Search handleSearchCity={handleSearchCity} />
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error fetching data</p>
      ) : data ? (
        <>
          <Card sx={{ background: '#f5f5f5', width: '380px', margin: '20px' }}>
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
                    {data.weather[0].description}
                  </Typography>
                  <Typography variant="body1">
                    {data.name} ({kelvinToCelsius(data.main.temp).toFixed(2)}
                    °C)
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
