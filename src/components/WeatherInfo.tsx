import React, { useEffect, useState } from 'react';
import { getWeatherByCity } from '../services/weatherService.ts';

export default function WeatherInfo({ city = "Munnar" }) {
  const [weather, setWeather] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getWeatherByCity(city)
      .then(setWeather)
      .catch(err => setError(err.message));
  }, [city]);

  if (error) return <div>Error: {error}</div>;
  if (!weather) return <div>Loading weather...</div>;

  return (
    <div style={{
      background: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)',
      borderRadius: '12px',
      boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
      padding: '1.5rem',
      maxWidth: 320,
      margin: '1rem auto',
      color: '#222',
      textAlign: 'center',
      fontFamily: 'inherit',
    }}>
      <h3 style={{ marginBottom: 8, fontWeight: 600, fontSize: '1.3rem', letterSpacing: 0.5 }}>
        <span role="img" aria-label="weather">🌤️</span> Weather in {weather.name}
      </h3>
      <p style={{ fontSize: '1.1rem', margin: '0.5rem 0', textTransform: 'capitalize' }}>
        <span role="img" aria-label="desc">📝</span> {weather.weather[0].description}
      </p>
      <p style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0.5rem 0' }}>
        <span role="img" aria-label="temp">🌡️</span> {weather.main.temp}°C
      </p>
      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: 12 }}>
        <span style={{ fontSize: '1rem' }}><span role="img" aria-label="humidity">💧</span> {weather.main.humidity}%</span>
        <span style={{ fontSize: '1rem' }}><span role="img" aria-label="wind">💨</span> {weather.wind.speed} m/s</span>
      </div>
    </div>
  );
}
