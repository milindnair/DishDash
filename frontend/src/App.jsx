
import './App.css';
import "./index.css";
import Login from './components/Login';
import Register from './components/Register';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './components/Home';
import Profile from './components/Profile';
import NewPostForm from './components/PostComponents/NewPostForm';
function App() {

  return (
    <>
      <Router>
      <Routes>        
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/newpost" element={<NewPostForm/>} />
      </Routes>
    </Router>
      
    </>
  )
}

export default App
