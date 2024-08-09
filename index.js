//!The Intl object is part of the Internationalization API in JS. It provides language-sensitive string comparison, number formatting, and date and time formatting.
//!The convertCountryCode function takes a country code as input and returns the corresponding full name of the country in English. It utilizes the Intl.DisplayNames API (part of Intl api).
//!The .of(country) is immediately called on the Intl.displayNames object to retrieve the country name corresponding to the provided country code.

const city_name = document.querySelector(".weather_city")
const date_time = document.querySelector(".weather_date_time")
const w_forecast = document.querySelector(".weather_forecast")
const w_icon = document.querySelector(".weather_icon")
const w_temp = document.querySelector(".weather_temperature")
const w_min = document.querySelector(".weather_min")
const w_max = document.querySelector(".weather_max")

const w_feelsLike = document.querySelector(".weather_feelsLike")
const w_humidity = document.querySelector(".weather_humidity")
const w_wind = document.querySelector(".weather_wind")
const w_pressure = document.querySelector(".weather_pressure")

const city_search = document.querySelector(".search_city")

const getDateAndTime = (dt)=>{
    const curDate = new Date(dt*1000)
    console.log(curDate);
    const options = {
        weekday: "long",
        year:"numeric",
        month:"long",
        day:"numeric",
        hour:"numeric",
        minute:"numeric"
    }
    const formatter = new Intl.DateTimeFormat("en-US",options)
    return formatter.format(curDate)
}

const getCountryName =(country)=>{
    const regionNamesInEnglish = new Intl.DisplayNames([country], { type: 'region' }).of(country);
    return regionNamesInEnglish
}

let city = "Bhubaneshwar"
city_search.addEventListener("submit",(e)=>{
    e.preventDefault()

    let cityName = document.querySelector(".city_name")
    console.log(cityName.value);
    city = cityName.value
    getWeatherData();
})


const getWeatherData = async() => {
    const weatherAPI = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=a0b06669a793506ae54060f7df8a5fb6`
    try {
       const res = await fetch(weatherAPI)
       const data = await res.json() 
       console.log(data);

       const {main,name,weather,wind,sys,dt} = data

       w_forecast.innerHTML = `${weather[0].main}`
       w_icon.innerHTML = `<img src = "https://openweathermap.org./img/wn/${weather[0].icon}@4x.png"/>`

       city_name.innerHTML = `${name},${getCountryName(sys.country)}`
       date_time.innerHTML = getDateAndTime(dt)

       w_temp.innerHTML = `${(main.temp-273.15).toFixed(2)}&#176`
       w_min.innerHTML = `Min: ${(main.temp_min-273.15).toFixed(2)}&#176`
       w_max.innerHTML = `Max: ${(main.temp_max-273.15).toFixed(2)}&#176`

       w_feelsLike.innerHTML = `${(main.feels_like-273.15).toFixed(2)}&#176`
       w_humidity.innerHTML = `${main.humidity}%`
       w_wind.innerHTML = `${wind.speed} m/s`
       w_pressure.innerHTML = `${main.pressure} hPa`
       
    } catch (error) {
        console.log(error);
    }
};

document.body.addEventListener("load",getWeatherData())