
type WeatherProps= {
    description:String
    temp:Number
    feels_like:Number
}

const ImageContainer =(props:WeatherProps)=>{
    const{description,temp,feels_like}=props
    return(
        <div className="weatherContainer">
        <img width={40} height={40} style={{marginBottom:'60px'}}src={process.env.PUBLIC_URL+"/storm.png"} alt="weather"/>
        <div style={{display:'flex',flexDirection:'column'}}>
     <span>Current Tempreture: {temp} °C </span>  
        <span>Feels Like: {feels_like} °C</span>
        </div>

        <div>
        {description}
        </div>
        </div>
    )

}

export default ImageContainer