/*

'use client'

import Image from "next/image";
import { ReactFormState } from "react-dom/client";
import WeatherCard from "./components/weatherCard";
import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState<string>("");
  const handleSubmit = (e:React.FormEvent) => {
    e.preventDefault();

    // return <WeatherCard place = {e.target.value}/>
    //No tiene sentido regresar un valor que no se va a renderizar dentro de una función onSubmit 

  };

  return (
    <div className = "absolute flex">
        <div className = "relative grid w-[100%] ">
          <form onSubmit = {handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                name = "place"
                value = {formData}
                onChange = {(e) => setFormData(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              // />                        HELLOWWWWWWWW COMO ANDAS CRIS-________-----
              <button
              type ="submit"
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                submit
              </button>
              {formData && <WeatherCard place={formData}/>}
            </div>
          </form>
        </div>
    </div>
  );
}
*/


'use client'

import { useState, useRef } from "react";
import WeatherCard from "./components/weatherCard";

export default function Home() {
  const [formData, setFormData] = useState<string>("");  
  const [cities, setCities] = useState<{ name: string, weatherData: any }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const citySet = useRef(new Set<string>());

  const handleErase = (locationName:string) =>{
    setCities(cities.filter((actCity)=>actCity.weatherData.location.name !== locationName));
    citySet.current.delete(locationName);
    return undefined;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return; 

    setLoading(true);

    fetch(`http://api.weatherapi.com/v1/current.json?key=495dcc2885004d9985521728252702&q=${formData}&aqi=no`)
      .then((response) => response.json())
      .then((data) => {
        if(!citySet.current.has(data.location.name)){
          citySet.current.add(data.location.name);
          setCities((prevCities) => 
            [...prevCities, { name: data.location.name, weatherData: data }]
          );
        
          setFormData(""); 
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  return (
    <div className ="flex flex-col h-screen justify-center align-center gap-8">
      <h1 className="text-4xl mx-auto align-center ">Weather API</h1>
        <form onSubmit={handleSubmit} className="space-y-4 flex flex-row justify-center">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-black-400">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="place"
              value={formData}
              onChange={(e) => setFormData(e.target.value)} 
              className="ml-auto block w-full rounded-md border border-gray-300 px-3 py-2"
            />
          </div>
          <button
            type="submit"
            className="m-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
        <div className="relative grid grid-cols-5 w-[100%] grid-flow-row gap-y-12">
          {cities.map((city, index) => (
            <WeatherCard key={index} place={city.name} weatherData={city.weatherData} handleClosure={handleErase}/>
          ))}
        </div>
    </div>
  );
}
