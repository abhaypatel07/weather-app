"use client"
import React, { useState } from 'react'
import Map from '../components/Map/Map'
import CardForLocation from '../components/CardForLocation/CardForLocation'


const WithLocation = () => {
  const [latLong,setLatLong] = useState<any>({lat:0,long:0});

  return (
    <div style={{display:"flex",gap:"10px",flexDirection:"column-reverse",justifyContent:"center",alignItems:"center"}}>
      <Map setLatLong={setLatLong}/>
      <CardForLocation latLong={latLong}/>
    </div>
  )
}

export default WithLocation;