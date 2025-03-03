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
              />
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

import { useState } from "react";
import WeatherCard from "./components/weatherCard";

export default function Home() {
  const [formData, setFormData] = useState<string>("");  // Guardar la ciudad actual que se está buscando
  const [cities, setCities] = useState<{ name: string, weatherData: any }[]>([]);  // Guardar las ciudades y sus datos
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return; // Si el formulario está vacío no hacer nada

    setLoading(true);

    // Llamada a la API con el lugar
    fetch(`http://api.weatherapi.com/v1/current.json?key=495dcc2885004d9985521728252702&q=${formData}&aqi=no`)
      .then((response) => response.json())
      .then((data) => {
        // Agregar la nueva ciudad con sus datos a la lista
        setCities((prevCities) => [
          ...prevCities,
          { name: formData, weatherData: data }
        ]);
        setFormData(""); // Limpiar el campo de texto después de agregar
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  return (
    <div className="absolute flex">
      <div className="relative grid w-[100%] ">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="place"
              value={formData}
              onChange={(e) => setFormData(e.target.value)} // Actualizamos solo el campo de texto
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            />
            <button
              type="submit"
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Submit
            </button>
          </div>
        </form>

        {/* Renderizar múltiples tarjetas */}
        {cities.map((city, index) => (
          <WeatherCard key={index} place={city.name} weatherData={city.weatherData} />
        ))}
      </div>
    </div>
  );
}
