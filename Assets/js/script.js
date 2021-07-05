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
    console.log(url)
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

    // Get weather icon
    let icon = data.current.weather[0].icon;
    let iconURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"

    // Display info on page
    document.getElementById("nameDate").innerHTML = 
        '<p>' + cityInput.value + " (" + (myDate.getMonth() + 1) + "/" + 
        myDate.getDate() + "/" + myDate.getFullYear() + ")" + '</p>' +
        '<img src="' + iconURL + '" alt="weatherIcon">'
    document.getElementById("displayTemp").textContent = temp;
    document.getElementById("displayWind").textContent = windSpeed;
    document.getElementById("displayHumid").textContent = humid;
    document.getElementById("displayUV").textContent = uv;
    if(uv <= 2) {
        document.getElementById("displayUV").style.background = "green";
    } else if(7 <= uv >= 3) {
        document.getElementById("displayUV").style.background = "orange";
    } else {
        document.getElementById("displayUV").style.background = "red";
    }

    // Get info for coming five days
    let forecast = data.daily;
    document.getElementById("forecastList").innerHTML = "";
    for (let i = 0; i < 5; i++) {
        // Convert data.current.dt into regular date
        var epochDate = forecast[i].dt;
        var myDate = new Date(0);
        myDate.setUTCSeconds(epochDate)

        var dayCard = document.createElement("LI");

        // Get date for forecasted day
        let dateForecast = (myDate.getMonth() + 1) + "/" + 
                            myDate.getDate() + "/" +
                            myDate.getFullYear();

        // Get weather icon
        let iconForecast = forecast[i].weather[0].icon;
        let iconURLForecast = "http://openweathermap.org/img/wn/" + iconForecast + "@2x.png"

        // Get other weather data 
        var tempForecast = "Temp: " + forecast[i].temp.day + " °F";
        let windSpeedForecast = "Wind Speed: " + forecast[i].wind_speed + " MPH";
        let humidForecast = "Humidity: " + forecast[i].humidity + "%";

        // Add info to dayCard
        dayCard.innerHTML = '<img src="' + iconURLForecast + '" alt="weatherIcon">' +
                            "<p>" + dateForecast + "</p>" +
                            "<p>" + tempForecast + "</p>" +
                            "<p>" + windSpeedForecast + "</p>" + 
                            "<p>" + humidForecast + "</p>"

        // Append dayCard to HTML code
        document.getElementById("forecastList").appendChild(dayCard);
      }
}

function setHistory(searchHistory, cityInput) {

    // Clear existing history list
    document.getElementById("historyList").innerHTML = "";

    // Add new item to history
    searchHistory.push(cityInput);

    // Update history in localStorage
    localStorage.setItem("city", JSON.stringify(searchHistory))
}

function getHistory() {
    // Get history 
    var searchHistory = JSON.parse(localStorage.getItem("city")) || [];

    return searchHistory;
}

function displayHistory(searchHistory) {
    // Reverse order so most recent is first
    searchHistory = searchHistory.reverse();

    // Display all history
    for (var i = 0; i < searchHistory.length; i++){
        var historyItem = document.createElement("LI");
        var entry = document.createTextNode(searchHistory[i]);

        historyItem.appendChild(entry);
        document.getElementById("historyList").appendChild(historyItem);

        // Stop loop when you reach fifth entry
        if(i === 4) {
            break;
        }
    }
}

// Event Listener for the Search button
document.getElementById("searchBtn").addEventListener("click", function() {
    let cityInput = document.getElementById("cityInput").value;
    setHistory(getHistory(), cityInput);
    getCityCoord(cityInput);
    displayHistory(getHistory());
})

displayHistory(getHistory());