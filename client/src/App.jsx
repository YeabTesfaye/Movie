
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Home from './components/home/Home';
import Admin from './components/admin/Admin';
import Auth from './components/auth/Auth';
import Movie from './components/movie/Movie';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { adminActions, userActions } from './store';
import Booking from './components/booking/Booking';
import UserProfile from './profile/UserProfile';
axios.defaults.baseURL = "http://localhost:8080/api";

function App() {

  const dispatch = useDispatch()
  useEffect(() => {
    if(localStorage.getItem("userId")){
      dispatch(userActions.login())
    }
    else if(localStorage.getItem("adminId")){
      dispatch(adminActions.login())
    }
  },[])
  return (
    <div>
      <Header />
      <section>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/auth' element={<Auth />} />
          <Route path='/movie' element={<Movie />} />
          <Route path='/booking/:id' element={<Booking />} />
          <Route path='/user' element={<UserProfile />} />
        </Routes>
      </section>
    </div>
  );
}

export default App
