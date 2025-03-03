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

// Definir el tipo de las props que va a recibir el componente
type WeatherCardProps = {
  place: string;
  weatherData: any; // Puedes definir un tipo más específico según lo que devuelve la API
};

const WeatherCard: React.FC<WeatherCardProps> = ({ place, weatherData }) => {
  // Extraemos los datos relevantes de la respuesta de la API
  const location = weatherData?.location?.name;
  const temperature = weatherData?.current?.temp_c; // Por ejemplo, la temperatura en grados Celsius
  const condition = weatherData?.current?.condition?.text; // El estado del clima (soleado, nublado, etc.)
  const icon = weatherData?.current?.condition?.icon; // Icono del clima

  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-sm mx-auto">
      <h2 className="text-xl font-bold text-gray-700">{place || location}</h2>
      <div className="flex items-center space-x-4">
        <img
          src={`http:${icon}`} // Usando el icono proporcionado por la API
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
