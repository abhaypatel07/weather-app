import axios from "axios";

class ApiService{
    static getWeatherFromCity = async (city:string)=>{
        const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=efb92e37bbf3e3e679bba8da7094e0ed`);
        return result;
    }
    static getWeatherFromLatLong = async (lat:number,long:number)=>{
        const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=efb92e37bbf3e3e679bba8da7094e0ed`);
        return result;
    }

}


export default ApiService;