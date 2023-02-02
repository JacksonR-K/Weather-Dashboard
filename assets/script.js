var savedCitiesEl = document.querySelector('#saved-cities');
var currentWeatherEl = document.querySelector('#current-weather');
var futureWeatherEl = document.querySelector('future-weather');

getSavedCities();

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