//Create references to HTML elements which need altered/accessed
var savedCitiesEl = document.querySelector('#saved-cities');
var currentWeatherEl = document.querySelector('#current-weather');
var futureWeatherEl = document.querySelector('#future-weather');
var searchBtnEl = document.querySelector('#search-btn');
var savedCityBtnsEl = $('#saved-cities');

//Create a global array so it can be accessed in both getSavedCities() and addSavedCity()
var savedCities = [];

//When user first loads the page, the weather content is defaulted to 'Toronto' and any saved cities are added to the side bar
getSavedCities();
getCurrentWeather('Toronto');
getFutureWeather('Toronto');

//When user clicks the 'Search' button
searchBtnEl.addEventListener('click', function() {
    //Get the value that the user entered into the text box
    var city = document.getElementById('city').value;
    //If user added some text
    if (city !== '') {
        //Clear error message if user triggered it on last search attempt
        document.querySelector('#input-error').textContent = ''; 
        //Attempt to populate the weather 'cards' using the user's inputted city
        getCurrentWeather(city);
        getFutureWeather(city);
    }
    //If user left text field blank
    else {
        document.querySelector('#input-error').textContent = 'Please enter a city!';
    }
})

//If user selects one of the buttons containing one of the previously searched cities, populate weather using it's text value
savedCityBtnsEl.on('click', '.saved-btn', function(event) {
    var city = (event.target).textContent;
    getCurrentWeather(city);
    getFutureWeather(city);
})

//Updates the side bar buttons to match the cities saved in storage (if any)
function getSavedCities() {
    if (localStorage.getItem('savedCities') !== null) {
        //Saves the stored values to an array so they can be manipulated/referenced in addSavedCity()
        savedCities = localStorage.getItem('savedCities').split(',');
        //Creates a button for each saved city
        for (var i=0; i<savedCities.length; i++) {
            var savedCityEl = document.createElement('button');
            savedCityEl.setAttribute('class', 'w-100 my-2 text-right saved-btn');
            savedCityEl.textContent = savedCities[i];
            savedCitiesEl.appendChild(savedCityEl);
        }
    }
}

function addSavedCity(city) {
    //If city is not already in list, add it and update the storage
    if (!savedCities.find(element => element.includes(city))){
        savedCities.push(city);
        localStorage.setItem('savedCities', savedCities);
    }
    //Remove existing buttons before updating the list of buttons using getSavedCities() to avoid duplicates of each city
    for (var i=0; i<savedCitiesEl.children.length;) {
        savedCitiesEl.removeChild(savedCitiesEl.children[0]);
    }
    //Adds back the buttons for each saved value
    getSavedCities();
}

//Attempt to call OpenWeather API using the specified city to get the current weather
function getCurrentWeather(city) {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=4eb2c9d3c5a077df7c67856cbfab5941', {

})
    .then(function (response) {
        //If the response returns invalid, alert the user to enter a valid place
        if (response.status !== 200) {
            document.querySelector('#input-error').textContent = 'Please enter a valid city!';
        }
        //Response was valid so attempt to add the city to local storage (if it doesn't already exist)
        else {
            addSavedCity(city);
        }
        return response.json();
    })
    .then(function (data) {
        //
        createCurrentCard(data);
    });
}
 
//Attempt to call OpenWeather API using the specified city to get the 5 day forecast
function getFutureWeather(city) {
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=imperial&appid=4eb2c9d3c5a077df7c67856cbfab5941', {

})
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        //The count variable is used to iterate within createFutureCard() when it determines which child's 'card' of futureWeatherEl is to be populated with the given data of the below for loop
        var count = 0;
        //The API returns 40 values. The loop cycles through and picks only the ones time stamped at 12PM (noon) to be displayed (5 instances)
        for (var i=0; i<40; i++) {
            if (data.list[i].dt_txt.includes('12:00:00')) {
                //Populate the values in each of the 'cards' in futureWeatherEl
                createFutureCard(data.list[i], count);
                //Count will go from 0-4 since the data returned from the API only contains 5 instances of 12PM
                count++;
            }
        }
    });
}

function createCurrentCard(weather) {
    //If the call to the API was successful, then populate the current weather with the given data
    if (weather.cod !== '404' && weather.cod !== '404') {
        var today = new Date();
        today = today.toLocaleDateString('en-US');
        currentWeatherEl.children[0].textContent = weather.name + ' (' + today + ')'; //Queried City + Date
        currentWeatherEl.children[1].setAttribute('src', 'http://openweathermap.org/img/wn/' + weather.weather[0].icon + '@2x.png'); //Weather Icon
        currentWeatherEl.children[2].textContent = 'Temp: ' + weather.main.temp + ' °F'; //Temperature
        currentWeatherEl.children[3].textContent = 'Wind: ' + weather.wind.speed + ' MPH'; //Wind speed
        currentWeatherEl.children[4].textContent = 'Humidity: ' + weather.main.humidity + ' %'; //Humidity
    }
}

function createFutureCard(weather, i) { 
    //If the call to the API was successful, then populate the forecasted weather with the given data
    if (weather.cod !== '404' && weather.cod !== '404') {
        futureWeatherEl.children[i].children[0].textContent = new Date(weather.dt_txt).toLocaleDateString('en-US'); //Forcasted Date
        futureWeatherEl.children[i].children[1].setAttribute('src', 'http://openweathermap.org/img/wn/' + weather.weather[0].icon + '@2x.png'); //Weather Icon
        futureWeatherEl.children[i].children[2].textContent = 'Temp: ' + weather.main.temp + ' °F'; //Temperature
        futureWeatherEl.children[i].children[3].textContent = 'Wind: ' + weather.wind.speed + ' MPH'; //Wind speed
        futureWeatherEl.children[i].children[4].textContent = 'Humidity: ' + weather.main.humidity + ' %'; //Humidity
    }
}