import BASEURL from "./BASEURL";
import axios from 'axios'

export const getAllMovies = async() => {
    try {
        const { data } = await axios.get(`/movie`);
        return data;
    } catch (err) {
        console.log(err);
        return
    }
}

export const userAuthRequest = async (data,signup) => {
  try {
    const {name,email,password} = data
    const { data: responseData } = await axios.post(
      `/user/${signup ? "signup" : "login"}`,
      {
        name: signup ? name : null,
        email,
        password,
      }
    );
    return responseData;
  } catch (err) {
    console.log(err);
    return;
  }
};

export const getMovieDetails = async (id) => {
 try {
  console.log(id);
   const { data: responseData } = await axios.get(`movie/${id}`);
   return responseData;
 } catch (error) {
  console.log(error);
  return
 }
};


export const adminAuthRequest = async (data) => {
  try {
    const { email, password } = data;
    const { data: responseData } = await axios.post(
      "/admin/login",
      {
        email,
        password,
      }
    );
    return responseData;
  } catch (err) {
    console.log(err.message);
    return;
  }
};



export const newBooking = async(data) => {
   const { movie, date, seatNumber } = data;
   const user = localStorage.getItem("userId")
   console.log(movie, date, seatNumber, user
    );
   try {
    const { data: responseData } = await axios.post("/booking", {
      movie, date, user, seatNumber
    });
    return responseData
    
   } catch (error) {
    console.log(error);
    return
   }
}


export const getBookingsOfUser = async() => {
  try {
    const id = localStorage.getItem("userId")
    const { data: responseData } = await axios.get(`/user/bookings/:${id} `);
    console.log(responseData);
    return responseData
  } catch (error) {
    console.log(error);
    return
  }
}