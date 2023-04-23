import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import "./index.css";
import Login from './components/Login';
import Register from './components/Register';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {

  return (
    <>
      <Router>
      <Routes>        
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />
      </Routes>
    </Router>
      
    </>
  )
}

export default App
