"use client"
import React, { useState } from "react";
import "./Card.css"
import ApiService from "@/app/services/ApiService";
import { IoSearch,IoLocationSharp } from "react-icons/io5";
import { WiHumidity } from "react-icons/wi";
import { FaCompressArrowsAlt, FaWind  } from "react-icons/fa";
import { GiWindsock } from "react-icons/gi";
import Loading from "../Loading/Loading";
import Link from "next/link";


const Card = () => {
  const [data,setData] = useState<any>({});
  const [city,setCity] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const getWeather = async ()=>{
    if(city === ""){
      alert("Please Enter The City!")
    }else{
      try {
        setLoading(true);
        const result = await ApiService.getWeatherFromCity(city);
        setData(result.data)
        console.log(result.data)
      } catch (error) {
        console.log("City not found!");
        alert("enter valid city!")
      } finally {
        setLoading(false);
      }
    }
  };

  const getTempSymbol = (celsius:number) => {
    if (celsius < 0) {
      return '❄️'; 
    } else if (celsius >= 0 && celsius < 20) {
      return '🌦️';
    } else {
      return '☀️'; 
    }
  };

  return (
          <>
          <div className="card"> 
          {data.main ? loading ? <Loading/> : 
            <div className="weatherInfo">
              <div className="left">
                <h1>{getTempSymbol(data.main.temp-273.15)}{(data.main.temp-273.15).toFixed(2)}°C</h1>
                <div className="highLow">
                  <div className="high"><p>High</p><h4>{(data.main.temp_max-273.15).toFixed(2)}</h4></div>
                  <div className="low"><p>Low</p><h4>{(data.main.temp_min-273.15).toFixed(2)}</h4></div>
                </div>
                <p className="cityName"><IoLocationSharp size={15}/>{data.name}, {data.sys.country}</p>
              </div>
              <div className="divider"></div>
              <div className="right">
                <div className="grid">
                  <div className="gridItem low"><WiHumidity size={30}/><p className="cityName">Humidity {data.main.humidity}</p></div>
                  <div className="gridItem low"><FaCompressArrowsAlt size={20}/><p className="cityName">Pressure {data.main.pressure}</p></div>
                  <div className="gridItem low"><FaWind size={22}/><p className="cityName">Speed {data.wind.speed}</p></div>
                  <div className="gridItem low"><GiWindsock size={22}/><p className="cityName">Deg {data.wind.deg}</p></div>            
                </div>
                <p>{data.weather[0].main}</p>
              </div>
            </div> : <div>Enter The City Name :)</div> }

            <div className="search">
              <input type="text" className="search-input" onChange={(e) => setCity(e.target.value) } placeholder="Enter city"/>
              <IoSearch className="search-icon" size={22} onClick={getWeather}/>
             </div>
            <Link href="/withlocation">
             <button>With Location</button>
            </Link>
            </div>
            </>
            );
};

export default Card;
