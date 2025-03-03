/*
import { useEffect, useState } from "react";

const WeatherCard = ({place} : {place:string}) =>{
    const [weatherData, setWeatherData] = useState(null);
    const [loading, isLoading] = useState(true);

    useEffect(() =>{
        const apiResp = fetch("http://api.weatherapi.com/v1/current.json?key=495dcc2885004d9985521728252702&q="+place+"&aqi=no")
        .then(apiResp => apiResp.json())
        .then(data => setWeatherData(data))
        .catch(error => console.log(error));
      }, []);   

    useEffect(
      () =>{
        isLoading(false);
      }, [weatherData]);

    /*
        async function getData(place:string){
        const apiResp = fetch("http://api.weatherapi.com/v1/current.json?key=495dcc2885004d9985521728252702&q="+place+"&aqi=no")
        .then(apiResp => apiResp.json())
        .catch(error => console.log(error));
        }
    /

    if(loading){
        return(
            <div>
                <span>Cargando...</span>
            </div>
        );
    }

    if(!loading){
        return(
            <div className= "relative flex w-[100%] h-32 w-64">
                <span>{JSON.stringify(weatherData)}</span>
            </div>
        );
    }
};

export default WeatherCard;
*/

import React from "react";

type WeatherCardProps = {
  place: string;
  weatherData: any; 
};

const WeatherCard: React.FC<WeatherCardProps> = ({ place, weatherData }) => {
  const location = weatherData?.location?.name;
  const temperature = weatherData?.current?.temp_c; 
  const condition = weatherData?.current?.condition?.text; 
  const icon = weatherData?.current?.condition?.icon; 

  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-sm mx-auto">
      <h2 className="text-xl font-bold text-gray-700">{place || location}</h2>
      <div className="flex items-center space-x-4">
        <img
          src={`http:${icon}`} 
          alt="Weather Icon"
          className="w-12 h-12"
        />
        <div>
          <p className="text-lg font-semibold">{temperature}°C</p>
          <p className="text-sm text-gray-600">{condition}</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
