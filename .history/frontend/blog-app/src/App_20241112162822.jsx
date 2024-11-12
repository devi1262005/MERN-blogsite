import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom"
import React from 'react'
import Login from "frontend\blog-app\src\pages\auth\Login.jsx";

import SignUp from "frontend\blog-app\src\pages\auth\SignUp.jsx";
import Home from "frontend\blog-app\src\pages\home\Home.jsx";


const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="\dashboard" exact element={<Home/>} />
          <Route path="\login" exact element={<Login/>} />
          <Route path="\sign" exact element={<SignUp/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
