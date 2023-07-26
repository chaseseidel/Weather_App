export default async function getWeatherData(city) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=406c03e47fb4422486932602232507&q=${city}`
  );
  const weatherData = await response.json();
  return weatherData;
}