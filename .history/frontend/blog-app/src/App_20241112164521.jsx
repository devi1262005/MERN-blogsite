import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React from 'react';
import Login from "frontend/blog-app/src/pages/auth/Login.jsx";
import SignUp from "/.src/pages/auth/SignUp.jsx";
import Home from "./src/pages/home/Home.jsx";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/dashboard" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
