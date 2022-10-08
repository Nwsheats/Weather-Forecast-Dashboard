console.log()
const button = $('#btn');
const dataFormEl = document.getElementById('data-submit');
const recentSearch = $('#recent-search');
const recentList = $('#recent-list');
const locationToday = $('#location-today');
const locationName = $('#location-name');
const temp = $('#temperature');
const wind = $('#wind');
const humidity = $('#humidity');
const forecast = $('#forecast');
const day1 = $('#day-1');
const day2 = $('#day-2');
const day3 = $('#day-3');
const day4 = $('#day-4');
const day5 = $('#day-5');
const date1 = $('#date-1');
const date2 = $('#date-2');
const date3 = $('#date-3');
const date4 = $('#date-4');
const date5 = $('#date-5');

const days = [day1, day2, day3, day4, day5];


const today = moment().format("MM-DD-YYYY")
const tomorrow = moment()


function getApi(event) {
    event.preventDefault();
    let locationSearch = $('#location').val();
    console.log(locationSearch);
    let geoCall = 'http://api.openweathermap.org/geo/1.0/direct?q='+locationSearch+'&appid=379288c134bd33ff0ca6a16b87f06183';
    console.log(geoCall);
    
    fetch(geoCall)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        getForecast(data);
      })
    }

function getForecast(locationData) {
  console.log(locationData);
  const latitude = locationData[0].lat;
  const longitude = locationData[0].lon;
  let apiCall = 'http://api.openweathermap.org/data/2.5/forecast?lat='+latitude+'&lon='+longitude+'&appid=379288c134bd33ff0ca6a16b87f06183&units=imperial';

    fetch(apiCall)
    .then(function (response) {
    return response.json();
    })
    .then(function (data) {
    console.log(data);
    popData(data);
    })
}

function popData(weatherData) {
  locationName.append(weatherData.city.name + ' ' + '('+today+')');
  temp.append(weatherData.list[0].main.temp + " °F");
  wind.append(weatherData.list[0].wind.speed + " MPH");
  humidity.append(weatherData.list[0].main.humidity + " %");
  for (let i = 0; i < 5; i++) {
  const tempForecast = weatherData.list[i].main.temp;
  console.log(tempForecast);
  const windForecast = weatherData.list[i].wind.speed;
  console.log(windForecast);
  const humidForecast = weatherData.list[i].main.humidity;
  console.log(humidForecast);
  days[i].append('<h4>' + today + '</h4> <h5> <br>' + 'Temp: ' + tempForecast + ' °F <br>' + 
  'Wind: ' + windForecast + ' MPH <br>' + 'Humidity: ' + humidForecast + ' % </h5>');

  

  // var moviePoster = document.createElement('img');

  // movieTitle.textContent = data.Search[0].Title;
  // moviePoster.src = data.Search[0].Poster;

  // usersContainer.innerHTML = ""

  // usersContainer.append(movieTitle);
  // usersContainer.append(moviePoster);
  }};



button.on('click', getApi);