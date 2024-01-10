import { useFetchForecastQuery } from '../store/index';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';
import './style/forecast.css';

// eslint-disable-next-line react/prop-types
const Forecast = ({ lat, lon }) => {
  const { data, error, isLoading } = useFetchForecastQuery({ lat, lon });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const kelvinToCelsius = (kelvin) => {
    return kelvin - 273.15;
  };

  console.log(data);

  return (
    <div className="container">
      <h2>Hourly Forecast</h2>
      <div className="hourly hourly-scrollable">
        {data.hourly.slice(0, 7).map((hour, index) => (
          <Card
            key={index}
            style={{ width: '140px', height: '180px', background: '#f5f5f5' }}
          >
            <CardContent>
              <CardMedia
                component="img"
                alt="weather"
                height="80"
                image={`icons/${hour.weather[0].icon}.svg`}
              />
              <Typography variant="body2" color="text.secondary">
                {new Date(hour.dt * 1000).toLocaleTimeString()}
              </Typography>
              <Typography variant="h6" component="div">
                {kelvinToCelsius(hour.temp).toFixed(2)}°C
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {hour.weather[0].description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2>Daily Forecast</h2>
      <div className="daily daily-scrollable">
        {data.daily.slice(0, 7).map((day, index) => (
          <Card
            key={index}
            style={{ width: '140px', height: '180px', background: '#f5f5f5' }}
          >
            <CardContent>
              <CardMedia
                component="img"
                alt="weather"
                height="80"
                image={`icons/${day.weather[0].icon}.svg`}
              />
              <Typography variant="body2" color="text.secondary">
                {new Date(day.dt * 1000).toLocaleDateString()}
              </Typography>
              <Typography variant="h6" component="div">
                {kelvinToCelsius(day.temp.day).toFixed(2)}°C
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {day.weather[0].description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
