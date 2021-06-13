import React,{useEffect, useState} from 'react';
import {CurrentWeather,latLongWeather} from 'src/utils/api'
import ImageContainer from '../components/imageContainer';
import Button from '../components/button';
import Scroll from '../components/scroll'
const Weather=()=>{
const [name,SetName]=useState<string>('')
const [value,SetValue]=useState<string>('')
const [foreCast,SetForeCast]=useState<any[]>([])
const [left,Setleft]=useState<boolean>(false)

const onSubmit=(e:any)=>{
    e.preventDefault();
    CurrentWeather(name).then((data)=>{
        SetValue(data.data.weather[0].main)
        console.log(data)
    }).catch(err=>console.error(err))
}
useEffect(()=>{
    navigator.geolocation.getCurrentPosition((position)=>{
        console.log("Got position", position.coords);
        var lat = position.coords.latitude; 
        let long = position.coords.longitude;
        try {
            latLongWeather(lat,long).then((data)=>{
             let final:any[]=   data.data.hourly.map((w:any,i:BigInteger)=>{
                    return {
                        ...w,
                        Description:w.weather[0].description
                    }
                })
                SetForeCast(final)
                console.log('final: ', final);
                // SetValue(data.data.weather[0].main)
            })
        } catch (error) {
            console.error(error)
        }
       
    })
},[])
const leftClick=(e:any)=>{
    Setleft(!left)
}
console.log(left)
return(
    <div>
    <form onSubmit={onSubmit}>
    <input type="text" name="City Name" id="" onChange={(e)=>SetName(e.target.value)} placeholder="Please insert a city name" />
    <input type="submit" value="Submit"/>
    </form>
    {value&&value}
    <div style={{display:'flex'}}>

    <Scroll className="WeatherImageBox">
    <div className="WeatherImage" role="list" >
      
    {

        foreCast?.length>0&&foreCast.map((w:any,i:Number)=>{
            if(i<10){
                return(
                    <div key={`${w?.Description}${w?.dt}`}>
                        <ImageContainer description={w?.Description} temp={w?.temp} feels_like={w?.feels_like}/>
                       </div>
                )
            }
        })}


    </div>

        </Scroll>
                <Button containerStyle={{display:'flex',alignItems:'center'}} onClick={leftClick}/>
    </div>
    </div>
)



}

export {Weather as default}