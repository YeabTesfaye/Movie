import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/home/Home";
import Admin from "./components/admin/Admin";
import Auth from "./components/auth/Auth";
import Movie from "./components/movie/Movie";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { adminActions, userActions } from "./store";
import Booking from "./components/booking/Booking";
import UserProfile from "./profile/UserProfile";
import AddMovie from "./components/movie/AddMovie";
import AdminProfile from "./profile/AdminProfile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFound from "./components/NotFound/NotFound";
import { CssBaseline } from "@mui/material";

axios.defaults.baseURL = "http://localhost:8080/api";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispatch(userActions.login());
    } else if (localStorage.getItem("adminId")) {
      dispatch(adminActions.login());
    }
  }, []);


  const isAdminloggedIn = useSelector((state) => state.admin.isloggedIn);
  const isUserloggedIn = useSelector((state) => state.user.isloggedIn);
  return (
    <>
      <ToastContainer position="bottom-center" limit={1} />
      <CssBaseline />
      <div>
        <Header />
        <section>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie" element={<Movie />} />
            {!isAdminloggedIn && !isUserloggedIn && (
              <>
                <Route path="/admin" element={<Admin />} />
                <Route path="/auth" element={<Auth />} />
              </>
            )}
            {isUserloggedIn && !isAdminloggedIn && (
              <>
                <Route path="/booking/:id" element={<Booking />} />
                <Route path="/user" element={<UserProfile />} />
              </>
            )}
            {isAdminloggedIn && !isUserloggedIn && (
              <>
                <Route path="/add" element={<AddMovie />} />
                <Route path="/adminUser" element={<AdminProfile />} />
              </>
            )}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </section>
      </div>
    </>
  );
}

export default App;
