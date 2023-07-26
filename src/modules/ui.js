import getWeatherData from "./api";

let tempC = true;
let currentCity = '';

export default function buttonEventListener() {
  const button = document.getElementById("submit");
  const input = document.getElementById("search");
  const tempC = document.getElementById

  button.addEventListener("click", async (e) => {
    const cityName = document.getElementById("city-name");

    try {
      const weather = await getWeatherData(`${input.value}`);
      input.value = "";
      displayInfo(weather);
      console.log(weather);
      currentCity = weather.location.name;
    } catch (error) {
      console.log(`You have an error to look at: ${error}`);
    }
  });

  document.addEventListener("keypress", async (event) => {
    if (event.key === "Enter") {
      button.click();
      input.value = "";
    }
  });
}

function displayInfo(city) {
  const cityName = document.getElementById("city-name");
  const currentTemp = document.getElementById("current-temp");
  const conditions = document.getElementById("conditions");
  const updateStatus = document.getElementById("update-status");
  const updateTime = city.current.last_updated.split(" ");
  const feelsLike = document.getElementById("feelTemp");
  const humidity = document.getElementById("humidity");
  const uvIndex = document.getElementById("UV");
  const visibility = document.getElementById("visibility");
  const wind = document.getElementById("wind");
  const pressure = document.getElementById("pressure");

  cityName.textContent = `${city.location.name}, ${city.location.country}`;
  currentTemp.textContent = `${city.current.temp_c} \xB0`;
  conditions.textContent = `${city.current.condition.text}`;
  updateStatus.textContent = `Updates as of ${convertTimeToTwelveHours(updateTime[1])}`;
  feelsLike.textContent = `Feels Like: ${city.current.feelslike_c} \xB0C`;
  humidity.textContent = `Humidity: ${city.current.humidity}%`;
  uvIndex.textContent = `UV Index: ${city.current.uv}`;
  visibility.textContent = `Visibility: ${city.current.vis_km} KM`;
  wind.textContent = `Wind: ${city.current.wind_kph} KPH ${city.current.wind_dir}`;
  pressure.textContent = `Pressure: ${city.current.pressure_mb} mb`;
}

function convertTimeToTwelveHours(time) {
  const timeArray = time.split(":");
  if (timeArray[0] > 12) {
    timeArray[0] -= 12;
    return `${timeArray[0]}:${timeArray[1]} pm`;
  } else {
    return `${timeArray[0]}:${timeArray[1]} am`;
  }
}

function changeCelciusToFahrenheit(city) {

}