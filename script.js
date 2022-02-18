const API_KEY = '1f3b96e0d13df7c70cebcf2cf0af9389'
const cityName = document.getElementById('CityName');
const date = document.getElementById('date');
const date2 = document.getElementById('date2');
const tempNight = document.getElementById('tempNight');
const tempDay = document.getElementById('tempDay');
const pressure = document.getElementById('pressure');
const windput = document.getElementById('wind');
const clodudy = document.getElementById('clodudy');
const deck = document.getElementById('card_deck');
const CitySearch = document.getElementById('CitySearch');
const sunSet = document.getElementById('sunSet');
const sunRise = document.getElementById('sunRise');

const showDate = () => 
{
    let data;
    today = new Date();
    if ((today.getMonth() + 1) < 10) 
    {
        let data = today.getDate() + "-0" + (today.getMonth() + 1) + "-" + today.getFullYear();
        date.textContent = data;
        date2.textContent += data;
    }
    else 
    {
        let data = today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
        date.textContent = data;
        date2.textContent += data;
    }
}
showDate();

const showWeatherByLocation = (pos) => 
{
    const coords = pos.coords;
    console.log(pos);
    const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${API_KEY}`
    fetch(URL)
        .then((res) => res.json())
        .then((res) => weatherInfo(res))
        .catch((err) => console.log(err))
        .finally(() => console.log("Kończe działanie wynikiem................"))
};

const weatherInfo = (info) => 
{
    const { clouds, coord, main, sys, weather, wind, name } = info;
    console.log(info);

    cityName.textContent = name;
    tempNight.textContent =convertToCelsius(main.temp_min) + "°C";
    tempDay.textContent =convertToCelsius(main.temp_max) + "°C";
    pressure.textContent =main.pressure + " hPa";
    windput.textContent =Math.round(wind.speed) + " km/h";
    clodudy.textContent =clouds.all + "%";
    sunSet.textContent =getTime(sys.sunset);
    sunRise.textContent =getTime(sys.sunrise);

};

const getMyLocation = () => 
{
    navigator.geolocation.getCurrentPosition((pos) => showWeatherByLocation(pos));
};

const convertToCelsius = (temp) => Math.round(temp - 273.15);
getMyLocation();

const showWeatherBylocation = () =>
{
    const URL =`https://api.openweathermap.org/data/2.5/weather?q=${CitySearch.value}&appid=${API_KEY}`
    fetch(URL)
        .then((res) => res.json())
        .then((res) => weatherInfo(res))
        .catch((err) => console.log(err))
        .finally(() => console.log("Kończe działanie wynikiem................"))
}
CitySearch.addEventListener('change', () => showWeatherBylocation())

const getTime = (time) =>
{
    const date = new Date(time * 1000);
    const hours = date.getHours();
    const minutes = "0" + date.getMinutes();
    const seconds = "0" + date.getSeconds();
    return hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
}