import React, {useState} from 'react';
import Navbar from "../../components/Navbar";
import {userNavigate} from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

const Home = () => {
const navigate=useNavigate();
const [userInfo, setUserInfo]=useState(null);

const getUserInfo=async() => {

try{
  const response=await axiosInstance.get("/get-user");
  if(response.data )
}



}





  return (
    <div>
      Home
    </div>
  )
}

export default Home
