import axios from 'axios';
import {BASE_URL} from "./constants";


const axiosInstance =axios.create({
baseURL: BASE_URL,
timeout:1000,
headers: {
    "Content-Type": "application/json",
},
});

axiosInstance.request.use{
    (config)=> {
        const accessToken= localStorage.getItem("token");
        if (accessToken){
            config.headers.Authorization='Be'
        }
    }
}