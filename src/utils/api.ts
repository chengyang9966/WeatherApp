import axios from 'axios'

const CurrentWeather=async(name:string)=>{
   return await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${name}&units=metric&appid=${sessionStorage.getItem('API_KEY')}`)

}

const Forecast5Weather=async(name:string)=>{
   return await axios.get(`https://api.openweathermap.org/data/2.5/forecast/daily?q=${name}&cnt=${5}&units=metric&appid=${sessionStorage.getItem('API_KEY')}`)
}
const latLongWeather=async(lat:string|number,lon:string|number)=>{
    return await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&cnt=${5}&units=metric&appid=${sessionStorage.getItem('API_KEY')}`)
}

export {CurrentWeather,Forecast5Weather,latLongWeather}