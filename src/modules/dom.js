import search from "../img/search.png";
import loading from "../img/loading.png";

export default function buildPage() {
  const container = document.getElementById("container");

  const mainContent = document.createElement("div");
  const form = document.createElement("form");

  //-----------------------MAIN CONTENT-----------------------//
  const cityName = document.createElement("div");
  const currentInfo = document.createElement("div");
  const conditions = document.createElement("p");
  const status = document.createElement("p");
  const extra = document.createElement("div");

  cityName.setAttribute("id", "city-name");
  currentInfo.setAttribute("id", "current-info");
  conditions.setAttribute("id", "conditions");
  status.setAttribute("id", "update-status");
  extra.setAttribute("id", "extra-info");

  //-----------------------CURRENT INFO-----------------------//
  const weatherIcon = document.createElement("img");
  const currentTemp = document.createElement("p");
  const tempButtons = document.createElement("div");
  const tempButtonC = document.createElement("button");
  const tempButtonF = document.createElement("button");

  weatherIcon.src = loading;
  weatherIcon.alt = "Current weather icon";
  weatherIcon.setAttribute("id", "current-icon");

  currentTemp.setAttribute("id", "current-temp");

  tempButtons.setAttribute("id", "temp-buttons");
  tempButtonC.textContent = "C";
  tempButtonC.setAttribute("id", "tempC");
  tempButtonC.className = "temp-button active";
  tempButtonF.textContent = "F";
  tempButtonF.setAttribute("id", "tempF");
  tempButtonF.className = "temp-button inactive";

  tempButtons.appendChild(tempButtonC);
  tempButtons.appendChild(tempButtonF);

  currentInfo.appendChild(weatherIcon);
  currentInfo.appendChild(currentTemp);
  currentInfo.appendChild(tempButtons);

  //-----------------------EXTRA INFO-----------------------//
  const feelTemp = document.createElement("div");
  const humidity = document.createElement("div");
  const uvIndex = document.createElement("div");
  const visibility = document.createElement("div");
  const wind = document.createElement("div");
  const pressure = document.createElement("div");

  feelTemp.classList.add("info");
  feelTemp.setAttribute("id", "feelTemp");

  humidity.classList.add("info");
  humidity.setAttribute("id", "humidity");

  uvIndex.classList.add("info");
  uvIndex.setAttribute("id", "UV");

  visibility.classList.add("info");
  visibility.setAttribute("id", "visibility");

  wind.classList.add("info");
  wind.setAttribute("id", "wind");

  pressure.classList.add("info");
  pressure.setAttribute("id", "pressure");

  extra.appendChild(feelTemp);
  extra.appendChild(humidity);
  extra.appendChild(uvIndex);
  extra.appendChild(visibility);
  extra.appendChild(wind);
  extra.appendChild(pressure);

  mainContent.setAttribute("id", "main-info");
  mainContent.appendChild(cityName);
  mainContent.appendChild(currentInfo);
  mainContent.appendChild(conditions);
  mainContent.appendChild(status);
  mainContent.appendChild(extra);
  //-----------------------FORM-----------------------//
  const input = document.createElement("input");
  const searchImg = document.createElement("img");

  input.type = "text";
  input.name = "search";
  input.placeholder = "Search Location";
  input.setAttribute("id", "search");

  searchImg.src = search;
  searchImg.alt = "Search icon";
  searchImg.setAttribute("id", "submit");

  form.setAttribute("id", "form");
  form.appendChild(input);
  form.appendChild(searchImg);

  container.appendChild(mainContent);
  container.appendChild(form);
}
