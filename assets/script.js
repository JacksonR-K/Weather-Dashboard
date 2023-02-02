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
        for (var i=0; i<40; i++) {
            if (data.list[i].dt_txt.includes("12:00:00")) {
                createFutureCard(data.list[i]);
            }
        }
    });
}

function createCurrentCard(weather) {
    var today = new Date();
    today = today.toLocaleDateString('en-US');
    
    var date = document.createElement('h2');
    date.textContent = weather.name + ' (' + today + ')';
    currentWeatherEl.appendChild(date);

    var icon = document.createElement('img');
    icon.setAttribute('src', 'http://openweathermap.org/img/wn/' + weather.weather[0].icon + '@2x.png');
    icon.setAttribute('width', '100px');
    currentWeatherEl.appendChild(icon);

    var temp = document.createElement('p');
    temp.textContent = 'Temp: ' + weather.main.temp + ' °F';
    currentWeatherEl.appendChild(temp);

    var wind = document.createElement('p');
    wind.textContent = 'Wind: ' + weather.wind.speed + " MPH";
    currentWeatherEl.appendChild(wind);
    
    var humidity = document.createElement('p');
    humidity.textContent = 'Humidity: ' + weather.main.humidity + " %";
    currentWeatherEl.appendChild(humidity);
}

function createFutureCard(weather) {    
    var futureCardEl = document.createElement('div');
    futureCardEl.setAttribute('class', 'card');
    futureWeatherEl.appendChild(futureCardEl);

    var date = document.createElement('h2');
    date.textContent = new Date(weather.dt_txt).toLocaleDateString('en-US');
    futureCardEl.appendChild(date);

    var icon = document.createElement('img');
    icon.setAttribute('src', 'http://openweathermap.org/img/wn/' + weather.weather[0].icon + '@2x.png');
    icon.setAttribute('width', '100px');
    futureCardEl.appendChild(icon);

    var temp = document.createElement('p');
    temp.textContent = 'Temp: ' + weather.main.temp + ' °F';
    futureCardEl.appendChild(temp);

    var wind = document.createElement('p');
    wind.textContent = 'Wind: ' + weather.wind.speed + " MPH";
    futureCardEl.appendChild(wind);
    
    var humidity = document.createElement('p');
    humidity.textContent = 'Humidity: ' + weather.main.humidity + " %";
    futureCardEl.appendChild(humidity);
}