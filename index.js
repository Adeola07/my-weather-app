let now = new Date();
let date = now.getDate();
let year = now.getFullYear();
let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
let day = days[now.getDay()];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  " Sept",
  "Oct",
  "Nov",
  "Dec",
];
function formatDate() {
  let hours = now.getHours();
  let minute = now.getMinutes();
  let month = months[now.getMonth()];

  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let currentDate = `${day} , ${month} ${date},${year} ${hours} : ${minute}`;
  let times = document.querySelector(".time");
  times.innerHTML = `${currentDate}`;
}
formatDate();

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `

        <div class="col-sm-2">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title" id="weather-forecast-day">${day}</h5>
              <p class="card-text" id ="weather-forecast-icon">⛅</p>

              <p class="temp" id="weather-forecast-temp">6°C</p>
            </div>
          </div>
          </div>
          `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "ced540f5728f0002c753875787475e3a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  console.log(response.data);
  celsiusTemperature = Math.round(response.data.main.temp);

  document.querySelector("h1").innerHTML = response.data.name;

  document.querySelector("#speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector(".current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
}
function showLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiKey = "ced540f5728f0002c753875787475e3a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}
let get = document.querySelector("#locate");
get.addEventListener("click", getCurrentLocation);

function search(city) {
  let apiKey = "ced540f5728f0002c753875787475e3a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#enter-city");
  search(cityInput.value);
}

function changeFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector(".current-temp");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}
function changeCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".current-temp");
  temperatureElement.innerHTML = celsiusTemperature;
}
let celsiusTemperature = null;

let form = document.querySelector("#searchCity");
form.addEventListener("submit", handleSubmit);

let unitCelsius = document.querySelector(".celsius");
unitCelsius.addEventListener("click", changeCelsius);

let unit = document.querySelector(".fahrenheit-temp");
unit.addEventListener("click", changeFahrenheit);

search("Sheffield");
