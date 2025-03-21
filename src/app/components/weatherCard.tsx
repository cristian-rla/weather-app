import React from "react";
import { IoClose } from 'react-icons/io5'

type WeatherCardProps = {
  place: string;
  weatherData: any; 
  handleClosure: (locationName:string) => undefined
};

const WeatherCard: React.FC<WeatherCardProps> = ({ place, weatherData, handleClosure }) => {
  const location = weatherData?.location?.name;
  const temperature = weatherData?.current?.temp_c; 
  const condition = weatherData?.current?.condition?.text; 
  const icon = weatherData?.current?.condition?.icon; 

  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-sm mx-auto">
      <div className="flex flex-left m-auto">
        <h2 className="text-xl font-bold text-gray-700">{location}</h2>
        <IoClose 
        size = "2rem" 
        color="red"  
        onClick={()=>handleClosure(location)}/>
      </div>
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
