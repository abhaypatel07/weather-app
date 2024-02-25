"use client"
import React, { useEffect, useState } from "react";
import "./CardForLocation.css"
import ApiService from "@/app/services/ApiService";
import { IoLocationSharp } from "react-icons/io5";
import { WiHumidity } from "react-icons/wi";
import { FaCompressArrowsAlt, FaWind  } from "react-icons/fa";
import { GiWindsock } from "react-icons/gi";
import Loading from "../Loading/Loading";
import Link from "next/link";

interface Iprop {
  latLong:any; 
}


const CardForLocation = (props:any) => {
  const [data,setData] = useState<any>({});
  const latLong = props.latLong;
  const [loading, setLoading] = useState<boolean>(false);

  
  useEffect(()=>{
    const getWeather = async ()=>{
      try {
        setLoading(true);
        const result = await ApiService.getWeatherFromLatLong(latLong.lat,latLong.long);
        setData(result.data);
      } catch (error) {
        alert("Location Not Found!")
      } finally {
        setLoading(false);
      }
  };
    getWeather();
  },[latLong])

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
            </div> : <div>Click On Map :)</div> }
            <Link href="/">
              <button>With City</button>
            </Link>
            </div>
            </>
            );
};

export default CardForLocation;
