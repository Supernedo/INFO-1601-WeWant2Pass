function ReadUserInput()
{
    GetWeatherAPI(document.querySelector(".TypeSearch").value);
    document.querySelector(".TypeSearch").value = "";
}

async function GenerateRandom()
{
    let response = await fetch("http://geodb-free-service.wirefreethought.com/v1/geo/cities?limit=1&offset=0&hateoasMode=off");
    let cities = await response.json();

    const {totalCount} = cities.metadata;

    this.randCity = (Math.floor(Math.random() * (totalCount - 1)) + 1);
}

async function SetWeatherDetailsLeft (latitude, longitude)
{
    let weather = {"apiKey": "feb60d1f607226fa66cc4b01e0fab2f2"}
    let response = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&units=metric&appid=" + weather.apiKey);
    let weatherDetails = await response.json();

    const {name} = weatherDetails;
    const {icon, description} = weatherDetails.weather[0];
    const {temp, humidity} = weatherDetails.main;
    const {speed} = weatherDetails.wind;

    let strings = {formattedName: name.replaceAll(" ", "%20"),}
    
    document.querySelector(".CityLeft").innerText = name;
    document.querySelector(".TempLeft").innerText = temp + " °C";
    document.querySelector(".WeatherIconLeft").src = "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".WeatherDescriptionLeft").innerText = "Showing " + description;
    document.querySelector(".HumidityLevelLeft").innerText = "Humidity Levels: " + humidity + "%";
    document.querySelector(".WindSpeedLeft").innerText = "Wind Speed: " + speed + " km/h";
}

async function SetWeatherDetailsRight (latitude, longitude)
{
    let weather = {"apiKey": "feb60d1f607226fa66cc4b01e0fab2f2"}
    let response = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&units=metric&appid=" + weather.apiKey);
    let weatherDetails = await response.json();

    const {name} = weatherDetails;
    const {icon, description} = weatherDetails.weather[0];
    const {temp, humidity} = weatherDetails.main;
    const {speed} = weatherDetails.wind;

    let strings = {formattedName: name.replaceAll(" ", "%20"),}
    
    document.querySelector(".CityRight").innerText = name;
    document.querySelector(".TempRight").innerText = temp + " °C";
    document.querySelector(".WeatherIconRight").src = "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".WeatherDescriptionRight").innerText = "Showing " + description;
    document.querySelector(".HumidityLevelRight").innerText = "Humidity Levels: " + humidity + "%";
    document.querySelector(".WindSpeedRight").innerText = "Wind Speed: " + speed + " km/h";
}

async function CycleWeather(direction)
{
    if (direction == 1)
        this.randCity += 1;
    
    if (direction == 2)
        this.randCity -= 1;

    let response = await fetch("http://geodb-free-service.wirefreethought.com/v1/geo/cities?limit=1&offset=" + this.randCity + "&hateoasMode=off");
    let cities = await response.json();

    const {latitude} = cities.data[0];
    const {longitude} = cities.data[0];

    GetLocationCoords(latitude, longitude);

    if (direction == 1)
    {
        let prevLocation = randCity + 1;

        let response = await fetch("http://geodb-free-service.wirefreethought.com/v1/geo/cities?limit=1&offset=" + prevLocation + "&hateoasMode=off");
        let cities = await response.json();

        const {latitude} = cities.data[0];
        const {longitude} = cities.data[0];

        this.prevLat = latitude;
        this.prevLong = longitude;

        SetWeatherDetailsLeft(this.prevLat, this.prevLong);
    }   

    if (direction == 1)
    {
        let prevLocation = randCity - 1;

        let response = await fetch("http://geodb-free-service.wirefreethought.com/v1/geo/cities?limit=1&offset=" + prevLocation + "&hateoasMode=off");
        let cities = await response.json();

        const {latitude} = cities.data[0];
        const {longitude} = cities.data[0];

        this.nexLat = latitude;
        this.nextLong = longitude;

        SetWeatherDetailsRight(this.nexLat, this.nextLong);
    } 

    if (direction == 2)
    {
        let prevLocation = randCity + 1;

        let response = await fetch("http://geodb-free-service.wirefreethought.com/v1/geo/cities?limit=1&offset=" + prevLocation + "&hateoasMode=off");
        let cities = await response.json();

        const {latitude} = cities.data[0];
        const {longitude} = cities.data[0];

        this.prevLat = latitude;
        this.prevLong = longitude;

        SetWeatherDetailsLeft(this.prevLat, this.prevLong);
    }   

    if (direction == 2)
    {
        let prevLocation = randCity - 1;

        let response = await fetch("http://geodb-free-service.wirefreethought.com/v1/geo/cities?limit=1&offset=" + prevLocation + "&hateoasMode=off");
        let cities = await response.json();

        const {latitude} = cities.data[0];
        const {longitude} = cities.data[0];

        this.nexLat = latitude;
        this.nextLong = longitude;

        SetWeatherDetailsRight(this.nexLat, this.nextLong);
    } 
}

async function GetLocationCoords(latitude, longtitude)
{
    let weather = {"apiKey": "feb60d1f607226fa66cc4b01e0fab2f2"}
    let response = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longtitude + "&units=metric&appid=" + weather.apiKey);
    let weatherDetails = await response.json();

    DisplayWeather(weatherDetails);
}

async function GetWeatherAPI(City)
{
    try
    {
        let weather = {"apiKey": "feb60d1f607226fa66cc4b01e0fab2f2"}
        let response = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + City + "&units=metric&appid=" + weather.apiKey);
        let weatherDetails = await response.json();
    
        DisplayWeather(weatherDetails);
    }
    catch (e)
    {
        console.log("City not found!");
    }
}

function DisplayWeather(weatherDetails)
{
    const {name} = weatherDetails;
    const {icon, description} = weatherDetails.weather[0];
    const {temp, humidity} = weatherDetails.main;
    const {speed} = weatherDetails.wind;

    let strings = {formattedName: name.replaceAll(" ", "%20"),}
    
    document.querySelector(".City").innerText = name;
    document.querySelector(".Temp").innerText = temp + " °C";
    document.querySelector(".WeatherIcon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".WeatherDescription").innerText = "Showing " + description;
    document.querySelector(".HumidityLevel").innerText = "Humidity Levels: " + humidity + "%";
    document.querySelector(".WindSpeed").innerText = "Wind Speed: " + speed + " km/h";

    document.body.style.backgroundImage = "url(https://source.unsplash.com/featured/?" + strings.formattedName + ")";
    document.querySelector(".Weather").classList.remove("Loading");
}

document.querySelector("#LeftArrow").addEventListener("click", function(){CycleWeather(1)});
document.querySelector("#RightArrow").addEventListener("click", function(){CycleWeather(2)});

document.querySelector(".Search button").addEventListener("click", function(){ReadUserInput();});
document.querySelector(".TypeSearch").addEventListener("keyup", function(event)
{
  if (event.key == "Enter")
    ReadUserInput(); 
});

async function OnPageLoad(direction)
{
    GetWeatherAPI("Port of Spain");

    if (navigator.geolocation)
    navigator.geolocation.getCurrentPosition(function(position)
    {
        GetLocationCoords(position.coords.latitude, position.coords.longitude);
    });

    if (direction == 1)
    {
        let prevLocation = this.randCity + 1;

        let response = await fetch("http://geodb-free-service.wirefreethought.com/v1/geo/cities?limit=1&offset=" + prevLocation + "&hateoasMode=off");
        let cities = await response.json();

        const {latitude} = cities.data[0];
        const {longitude} = cities.data[0];

        this.prevLat = latitude;
        this.prevLong = longitude;

        SetWeatherDetailsLeft(this.prevLat, this.prevLong);
    }   

    if (direction == 1)
    {
        let prevLocation = this.randCity - 1;

        let response = await fetch("http://geodb-free-service.wirefreethought.com/v1/geo/cities?limit=1&offset=" + prevLocation + "&hateoasMode=off");
        let cities = await response.json();

        const {latitude} = cities.data[0];
        const {longitude} = cities.data[0];

        this.nexLat = latitude;
        this.nextLong = longitude;

        SetWeatherDetailsRight(this.nexLat, this.nextLong);
    } 
}

GenerateRandom();