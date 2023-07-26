import getWeatherData from "./api";
import { getImageCode } from "./api";

let currentCity = "London";

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}

const dayIcons = importAll(
  require.context("../img/day", false, /\.(png|jpe?g|svg)$/)
);
const nightIcons = importAll(
  require.context("../img/night", false, /\.(png|jpe?g|svg)$/)
);

export default function buttonEventListener() {
  const button = document.getElementById("submit");
  const input = document.getElementById("search");
  const tempC = document.getElementById("tempC");
  const tempF = document.getElementById("tempF");

  button.addEventListener("click", async (e) => {
    const cityName = document.getElementById("city-name");

    try {
      const weather = await getWeatherData(`${input.value}`);
      input.value = "";
      displayInfoMetric(weather);
      await displayWeatherIcon(weather);
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

  tempC.addEventListener("click", async () => {
    if (tempC.classList.contains("active")) {
      return;
    } else {
      tempC.className = "temp-button active";
      tempF.className = "temp-button inactive";
      try {
        const weather = await getWeatherData(currentCity);
        displayInfoMetric(weather);
      } catch (error) {
        console.log(`You have an error to look at: ${error}`);
      }
    }
  });

  tempF.addEventListener("click", async () => {
    if (tempF.classList.contains("active")) {
      return;
    } else {
      tempC.className = "temp-button inactive";
      tempF.className = "temp-button active";
      try {
        const weather = await getWeatherData(currentCity);
        displayInfoImperial(weather);
      } catch (error) {
        console.log(`You have an error to look at: ${error}`);
      }
    }
  });
}

export async function loadPage() {
  const weather = await getWeatherData("London");
  displayInfoMetric(weather);
  await displayWeatherIcon(weather);
}

function displayInfoMetric(city) {
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
  updateStatus.textContent = `Updates as of ${convertTimeToTwelveHours(
    updateTime[1]
  )}`;
  feelsLike.textContent = `Feels Like: ${city.current.feelslike_c} \xB0C`;
  humidity.textContent = `Humidity: ${city.current.humidity}%`;
  uvIndex.textContent = `UV Index: ${city.current.uv}`;
  visibility.textContent = `Visibility: ${city.current.vis_km} KM`;
  wind.textContent = `Wind: ${city.current.wind_kph} KPH ${city.current.wind_dir}`;
  pressure.textContent = `Pressure: ${city.current.pressure_mb} mb`;
}

function displayInfoImperial(city) {
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
  currentTemp.textContent = `${city.current.temp_f} \xB0`;
  conditions.textContent = `${city.current.condition.text}`;
  updateStatus.textContent = `Updates as of ${convertTimeToTwelveHours(
    updateTime[1]
  )}`;
  feelsLike.textContent = `Feels Like: ${city.current.feelslike_f} \xB0F`;
  humidity.textContent = `Humidity: ${city.current.humidity}%`;
  uvIndex.textContent = `UV Index: ${city.current.uv}`;
  visibility.textContent = `Visibility: ${city.current.vis_miles} Miles`;
  wind.textContent = `Wind: ${city.current.wind_mph} MPH ${city.current.wind_dir}`;
  pressure.textContent = `Pressure: ${city.current.pressure_in} in`;
}

async function displayWeatherIcon(city) {
  const icon = document.getElementById("current-icon");
  const time = city.location.localtime;
  const timeArray = time.split(" ");
  const hour = timeArray[1].split(":");

  const imageCode = await getImageID(city.current.condition.code);
  console.log(imageCode);

  if (hour[0] > 6 && hour[0] < 18) {
    icon.src = dayIcons[`${imageCode}.png`];
  } else {
    icon.src = nightIcons[`${imageCode}.png`];
  }
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

async function getImageID(objectCode) {
  const codes = await getImageCode();

  const imageCodes = codes.find((object) => {
    return object.code === objectCode;
  });

  return imageCodes.icon;
}
