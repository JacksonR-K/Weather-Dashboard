var savedCitiesEl = document.querySelector('#saved-cities');
var currentWeatherEl = document.querySelector('#current-weather');
var futureWeatherEl = document.querySelector('#future-weather');

getSavedCities();
getCurrentWeather();
getFutureWeather();

function getSavedCities() {
    if (localStorage.getItem('savedCities') !== null) {
        var savedCities = localStorage.getItem('savedCities').split(',');
        for (var i=0; i<savedCities.length; i++) {
            var savedCityEl = document.createElement('button');
            savedCityEl.setAttribute('class', 'w-100 my-2 text-right');
            savedCityEl.textContent = savedCities[i];
            savedCitiesEl.appendChild(savedCityEl);
        }
    }
}

function getCurrentWeather() {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=Toronto&units=imperial&appid=4eb2c9d3c5a077df7c67856cbfab5941', {

})
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        createCurrentCard(data);
    });
}
 
function getFutureWeather() {
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=Toronto&units=imperial&appid=4eb2c9d3c5a077df7c67856cbfab5941', {

})
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        var count = 0;
        for (var i=0; i<40; i++) {
            if (data.list[i].dt_txt.includes('12:00:00')) {
                createFutureCard(data.list[i], count);
                count++;
            }
        }
    });
}

function createCurrentCard(weather) {
    var today = new Date();
    today = today.toLocaleDateString('en-US');

    currentWeatherEl.children[0].textContent = weather.name + ' (' + today + ')';
    currentWeatherEl.children[1].setAttribute('src', 'http://openweathermap.org/img/wn/' + weather.weather[0].icon + '@2x.png');
    currentWeatherEl.children[2].textContent = 'Temp: ' + weather.main.temp + ' °F';
    currentWeatherEl.children[3].textContent = 'Wind: ' + weather.wind.speed + ' MPH';    
    currentWeatherEl.children[4].textContent = 'Humidity: ' + weather.main.humidity + ' %';
}

function createFutureCard(weather, i) { 
    futureWeatherEl.children[i].children[0].textContent = new Date(weather.dt_txt).toLocaleDateString('en-US');
    futureWeatherEl.children[i].children[1].setAttribute('src', 'http://openweathermap.org/img/wn/' + weather.weather[0].icon + '@2x.png');
    futureWeatherEl.children[i].children[2].textContent = 'Temp: ' + weather.main.temp + ' °F';
    futureWeatherEl.children[i].children[3].textContent = 'Wind: ' + weather.wind.speed + ' MPH';
    futureWeatherEl.children[i].children[4].textContent = 'Humidity: ' + weather.main.humidity + ' %';
}