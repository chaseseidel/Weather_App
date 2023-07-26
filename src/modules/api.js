export default async function getWeatherData(city) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=406c03e47fb4422486932602232507&q=${city}`
  );
  const weatherData = await response.json();
  return weatherData;
}

export async function getImageCode() {
  const response = await fetch(
    "https://www.weatherapi.com/docs/weather_conditions.json"
  );
  const imageCodes = await response.json();
  return imageCodes;
}
