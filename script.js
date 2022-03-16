let weather = {
  //mano apiKey openweather tinklapyje;
  apiKey: "bc7094585ff6a51a2e4b0adfedac4e34",
  
  fetchCoords: function (city) {
    fetch("http://api.openweathermap.org/geo/1.0/direct?q="
    +city+"&limit=1&appid="
    +this.apiKey)
    .then(response=> response.json())
    .then(data=> this.setCoords(data))
  },
  setCoords: function(data) {
    const { lat, lon } = data[0];
    this.fetchWeather(lat, lon);
  },
  
  fetchWeather: function (lat, lon) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?lat="
      +lat+"&lon="
      +lon+"&units=metric&appid="
      +this.apiKey
      )
      .then(response=> response.json())
      .then(weatherData=> this.displayWeather(weatherData))
    },
    displayWeather: function (obj) {
      const { name }= obj;
      const { temp, humidity }= obj.main;
      const { description, icon }= obj.weather[0];
      const { speed }= obj.wind;
      document.querySelector(".city").innerText = "Weather in " + name;
      document.querySelector(".temp").innerText = temp.toString().match(/\d*\.\d/) + "°";
      document.querySelector(".icon").src = "http://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector(".description").innerText = description;
      document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
      document.querySelector(".wind").innerText = "Wind speed: " + speed + "km/h";
      document.body.style.backgroundImage = "url('http://source.unsplash.com/1600x900/?"+ name +"')";
      document.querySelector(".weather").classList.remove("loading");
    },
    
    searchCityWeatherByName: 
    function() {
      this.fetchCoords(document.querySelector(".search-bar").value)
    }
  };
  
  document.querySelector(".search button")
  .addEventListener("click", function(){weather.searchCityWeatherByName()});
  
  document.querySelector(".search-bar").addEventListener("keyup", function(event) {
    if (event.key == "Enter"){
      weather.searchCityWeatherByName()
    }
  });

window.onload = function () {
   return weather.fetchCoords("Sydney");
  }
  
