const API_KEY = 'YOUR_API_KEY'; // <-- Paste your API key here

export async function getWeatherByCity(city: string) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }
  return response.json();
}
