const input = document.querySelector("input");
const inputGroup = document.querySelector(".input-group");
const cardInner = document.querySelector(".card-inner");
const cityName = document.querySelector(".city-name");
const cityCountry = document.querySelector(".city-country");
const timeDisplay = document.querySelector(".time-display");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".current-description");
const wind = document.querySelector(".detail-wind");
const visibility = document.querySelector(".detail-visibility");
const pressure = document.querySelector(".detail-pressure");
const humidity = document.querySelector(".detail-humidity");
const modalError = document.querySelector(".modal-error");

input.addEventListener("keydown", async (e) => {
  if (e.key === "Enter") {
    if (!input.value) {
      return;
    }
    const data = await fetchWeather(input.value);
    if (+data.cod === 404) {
      modalError.classList.add("show");
      setTimeout(() => {
        modalError.classList.remove('show');
      }, 2000);
    }

    appendWeather(data);
  }
});

const fetchWeather = async function (location) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=81143292db9a9d52aa11afaa2af6cddf`
  );
  const data = await response.json();
  return data;
};

const appendWeather = function (data) {
  cityName.textContent = data.name;
  cityCountry.textContent = data.sys.country;

  const newDate = new Date();
  timeDisplay.textContent = newDate.toTimeString().slice(0, 5);

  temperature.textContent = (data.main.temp - 273.15).toFixed();
  description.textContent = data.weather[0].main;

  if (description.textContent === "Rain") {
    cardInner.style.background =
      "url(https://media2.giphy.com/media/DD4FroTT30PeSamZbG/giphy.gif?cid=52b5febdgmh568ihn4gnu3yazifhlqei4xd0mm39m3ohhqi5&rid=giphy.gif&ct=g)";
  } else if (description.textContent === "Clouds") {
    cardInner.style.background =
      "url(https://media0.giphy.com/media/3o7rc6sa2RvKo8K5EI/giphy.gif?cid=ecf05e47069ipjw9ysnjm07gku85fza72jmjud7p0jq7rk7p&rid=giphy.gif&ct=g) no-repeat center / cover";
  } else if (description.textContent === "Snow") {
    cardInner.style.background =
      "url(https://media2.giphy.com/media/6YNgoTEPs6vZe/giphy.gif?cid=ecf05e473zty1j5jz195u4ylcnnwfqexux49w8rc6royjhab&rid=giphy.gif&ct=g)";
  } else if (description.textContent === "Clear") {
    cardInner.style.background =
      "url(https://media0.giphy.com/media/wNipYAoZ3iaEE/giphy.gif?cid=ecf05e47488k93p8btyi71go24pq7mctye0r0tuakc8rhy43&rid=giphy.gif&ct=g)";
  } else if (description.textContent === "Thunderstorm") {
    cardInner.style.background =
      "url(https://media2.giphy.com/media/3osxYzIQRqN4DOEddC/giphy.gif?cid=ecf05e479crwj5jdf5v6xlybg1q8gkmnznk74z0qqmhy6k2o&rid=giphy.gif&ct=g)";
  } else {
    cardInner.style.background =
      "url(https://media1.giphy.com/media/1zgzISaYrnMAYRJJEr/giphy.gif?cid=ecf05e47msa4jyggxjqv7ly7fqoz3sogpyxs722nn5w53vyz&rid=giphy.gif&ct=g) no-repeat center / cover";
  }

  wind.textContent = `${data.wind.speed}m/s`;
  visibility.textContent = `${(data.visibility / 1000).toFixed(1)}km`;
  pressure.textContent = `${data.main.pressure}hPa`;
  humidity.textContent = `${data.main.humidity}%`;
};