import { CurrentForcast } from "./weatherData.js";
import { getLocation } from "./getLocation.js";

const hoursIn24El = document.getElementById("24-hour"),
  hoursIn12El = document.getElementById("12-hour"),
  dateEl = document.getElementById("date"),
  amPmEl = document.getElementById("am-pm");

setInterval(() => { //refactor this into a module.
  const time = new Date();
  const month = time.toLocaleString("default", { month: "long" }),
    dayName = time.toLocaleString("default", { weekday: "long" }),
    dayNum = time.toLocaleString("default", { day: "numeric" }),
    year = time.getFullYear(),
    hour = time.getHours(),
    minute = time.getMinutes(),
    HourIn12 = hour >= 13 ? hour % 12 : hour,
    amPm = hour >= 12 ? "PM" : "AM",
    format24Hour = (hour < 10 ? "0" + hour : hour),
    formatMin = (minute < 10 ? "0" + minute : minute);

  hoursIn12El.textContent = `${HourIn12}:${formatMin}`;
  amPmEl.textContent = amPm;
  hoursIn24El.textContent = `${format24Hour}:${formatMin}`;
  dateEl.textContent = `${dayName}, ${month} ${dayNum}, ${year}`
}, 1000);

let unit = "imperial";
const { coords: { latitude, longitude } } = await getLocation();
const currentWeatherForcast = new CurrentForcast(unit, latitude, longitude);
const rawWeatherData = await currentWeatherForcast.getCurrentWeatherData();

const { temp, feels_like, temp_min, temp_max } = rawWeatherData.main;
const { description, icon } = rawWeatherData.weather[0];

const currentTemp = document.getElementById("current-temp"),
  feelsLike = document.getElementById("feels-like"),
  weatherIcon = document.getElementById("weather-icon-image"),
  currentMinMax = document.getElementById("current-min-max"),
  currentDescription = document.getElementById("current-description");

currentTemp.firstChild.nodeValue = `${temp}\u00B0F`;
feelsLike.textContent = `Feels like: ${feels_like}\u00B0;`;
currentMinMax.textContent = `L: ${temp_min}\u00B0F H: ${temp_max}\u00B0F`;
weatherIcon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
currentDescription.textContent = `${description}`;