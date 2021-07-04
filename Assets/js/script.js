let apiKey = "a753cb4c242ec2b4ceef62eba6bb6750"

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
    url = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey

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
    // Convert data.current.dt into regular date
    var epochDate = data.current.dt;
    var myDate = new Date(0);
    myDate.setUTCSeconds(epochDate)

    // Get current date's info
    let temp = data.current.temp;
    let windSpeed = data.current.wind_speed;
    let humid = data.current.humidity;
    let uv = data.current.uvi;

    // Get info for coming five days
    let forecast = data.daily;
    var dayCard = document.createElement("LI");
    // var dayWindSpeed =
    // var dayHumid = 
    dayCard.innerHTML = "Temp: " + forecast[0].temp.day;
    document.getElementById("forecastList").appendChild(dayCard);


    // Display info on page
    document.getElementById("nameDate").textContent = cityInput.value + " (" + (myDate.getMonth() + 1) + "/" + 
                                                    myDate.getDate() + "/" +
                                                    myDate.getFullYear() + ")";
    document.getElementById("displayTemp").textContent = temp;
    document.getElementById("displayWind").textContent = windSpeed;
    document.getElementById("displayHumid").textContent = humid;
    document.getElementById("displayUV").textContent = uv;
}

// Event Listener for the Search button
document.getElementById("searchBtn").addEventListener("click", function() {
    let cityInput = document.getElementById("cityInput").value;
    getCityCoord(cityInput);
})