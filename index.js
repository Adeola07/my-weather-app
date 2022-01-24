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
  let currentDate = `${day} , ${month} ${date},${year} ${hours} : ${minute}`;

  let times = document.querySelector(".time");
  times.innerHTML = `${currentDate}`;
}
formatDate();

function findCity(event) {
  event.preventDefault();
  let input = document.querySelector("#enterCity");
  console.log(input.value);
  let cityEmoji = "📍";
  let newCity = `${cityEmoji} ${input.value}`;
  let currentCity = document.querySelector("h1");
  currentCity.innerHTML = `${newCity}`;
}
let form = document.querySelector("#searchCity");
form.addEventListener("submit", findCity);

function displayTemperature(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  let dispTemperature = document.querySelector(".current-temp");
  dispTemperature.innerHTML = `${temperature}`;
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

function showTemperature(response) {
  console.log(response.data);
  let temperature = Math.round(response.data);
  let input = document.querySelector("#enterCity");
  let showTemp = document.querySelector(".current-temp");
  showTemp.innerHTML = `${temperature}`;
  let apiKey = "ced540f5728f0002c753875787475e3a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayTemperature);
}
let button = document.querySelector("#searchCity");
button.addEventListener("submit", showTemperature);
