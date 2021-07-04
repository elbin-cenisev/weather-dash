let city = "Richmond"
let apiKey = "a753cb4c242ec2b4ceef62eba6bb6750"
let url = "https://api.openweathermap.org/data/2.5/onecall?lat=37.5538&lon=-77.4603&exclude={part}&appid=" + apiKey;

function getData() {
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

getData();