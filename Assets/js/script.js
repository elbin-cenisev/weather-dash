let city = "Richmond"
let apiKey = "a753cb4c242ec2b4ceef62eba6bb6750"
let url = "https://api.openweathermap.org/data/2.5/onecall?lat=37.5538&lon=-77.4603&exclude={part}&appid=" + apiKey;

function getCityCoord(city) {
    url = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

    fetch(url)
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        let lon = data.coord.lon;
        let lat = data.coord.lat;
        getCityData(lat, lon)
    })
    .catch(function (err) {
        console.log(err)
    });
}

function getCityData(lat, lon) {
    url = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude={part}&appid=" + apiKey

    fetch(url)
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        appendData(data);
    })
    .catch(function (err) {
        console.log(err)
    });
}

function appendData(data) {
    let temp = data.current.temp;
    let windSpeed = data.current.wind_speed;
    let humid = data.current.humidity;
    let uv = data.current.uvi;

    document.getElementById("displayTemp").textContent = temp;
    document.getElementById("displayWind").textContent = windSpeed;
    document.getElementById("displayHumid").textContent = humid;
    document.getElementById("displayUV").textContent = uv;
}

document.getElementById("searchBtn").addEventListener("click", function() {
    let cityInput = document.getElementById("cityInput").value;
    console.log(cityInput);
    getCityCoord(cityInput);
})

// textbox put in a city name
// you pass city name to getCityCoord which uses returns lat and lon
// you pass lat and long to getCityData returns data to appendData
// appenData fills in text on website