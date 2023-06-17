
import './App.css';
import "./index.css";
import Login from './components/Login';
import Register from './components/Register';
import { BrowserRouter as Router, Route, Routes,Navigate } from "react-router-dom";
import Home from './components/Home';
import Profile from './components/Profile';
import NewPostForm from './components/PostComponents/NewPostForm';
import ProfileView from './components/Profile/ProfileView';
import { useSelector } from 'react-redux';
// import store from './store/store';
import EditProfile from './components/Profile/EditProfile';

function App() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  

  return (
    <>
      <Router>
      <Routes>        
      <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
        <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/newpost" element={isLoggedIn ? <NewPostForm /> : <Navigate to="/login" />} />
        <Route path="/profile/:username" element={<ProfileView />} />
        <Route path="/editProfile" element={isLoggedIn ? <EditProfile /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
      
    </>
  )
}

export default App
