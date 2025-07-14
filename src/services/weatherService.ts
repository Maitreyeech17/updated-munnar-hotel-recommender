const API_KEY = '3b6f48dfa99c631abab6a019ee6224f2'; // <-- Paste your API key here

export async function getWeatherByCity(city: string) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }
  return response.json();
}
