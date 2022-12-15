const elBtn = document.querySelector(".search");
const video1 = document.querySelector(".video1");
const text = document.querySelector("h1");

elBtn.addEventListener("click", (e) => {
  e.preventDefault();
  elInput.style.transition = "all .5 ease";
  elInput.style.transform = "translateY(0%)";
});

const api = {
  key: "2c3c1e48ce17ce495f195b55d45bb540",
  urlApi: "https://api.openweathermap.org/data/2.5/",
};

const elInput = document.querySelector("input");

elInput.addEventListener("keydown", setQuery);
function setQuery(e) {
  if (e.keyCode == 13) {
    console.log(elInput.value);
    getResult(elInput.value);
  }
}

function getResult(result) {
  fetch(`${api.urlApi}weather?q=${result}&units=metric&APPID=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResults);
}

function displayResults(weather) {
  console.log(weather);
  let city = document.querySelector(".all3 h4");
  city.innerHTML = `${weather.name},${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector(".newDate");
  date.innerHTML = dateBuilder(now);
  let temp = document.querySelector("h2");
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;
  if (Math.round(weather.main.temp) < 0 || Math.round(weather.main.temp) < 18) {
    document.body.style.backgroundImage = "url(../img/22.jpg)";
    document.body.style.backgroundSize = "cover";
    text.textContent = "It's winter in this city";
  } else if (Math.round(weather.main.temp) < 20) {
    document.body.style.backgroundImage = "url(../img/3.jpg)";
    document.body.style.backgroundSize = "cover";
    text.textContent = "It's autumn in this city";
  } else if (Math.round(weather.main.temp) < 25) {
    document.body.style.backgroundImage = "url(../img/1.jpg)";
    document.body.style.backgroundSize = "cover";
    text.textContent = "It's spring in this city";
  } else {
    document.body.style.backgroundImage = "url(../img/ss.jpg)";
    document.body.style.backgroundSize = "cover";
    text.textContent = "It's summer in this city";
  }
}

function dateBuilder(s) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[s.getDay()];
  let date = s.getDay();
  let month = months[s.getMonth()];
  let year = s.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
