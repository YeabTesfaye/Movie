import axios from "axios";

export const getAllMovies = async () => {
  try {
    const { data } = await axios.get(`/movie`);
    return data;
  } catch (err) {
    console.log(err);
    return;
  }
};

export const userAuthRequest = async (data, signup) => {
  try {
    const { name, email, password } = data;
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
    return;
  }
};

export const adminAuthRequest = async (data) => {
  try {
    const { email, password } = data;
    const { data: responseData } = await axios.post("/admin/login", {
      email,
      password,
    });
    return responseData;
  } catch (err) {
    console.log(err.message);
    return;
  }
};

export const newBooking = async (data) => {
  const { movie, date, seatNumber } = data;
  const user = localStorage.getItem("userId");
  console.log(movie, date, seatNumber, user);
  try {
    const { data: responseData } = await axios.post("/booking", {
      movie,
      date,
      user,
      seatNumber,
    });
    return responseData;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const getBookingsOfUser = async () => {
  try {
    const id = localStorage.getItem("userId");
    console.log(id);
    const { data: responseData } = await axios.get(`/user/bookings/${id} `);

    return responseData;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const getUserById = async () => {
  try {
    const id = localStorage.getItem("userId");
    const { data: responseData } = await axios.get(`user/${id}`);
    return responseData;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const getMovieById = async (id) => {
  try {
    const { data: responseData } = await axios.get(`movie/${id}`);
    return responseData;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const delteBookingById = async (id) => {
  try {
    console.log(id);
    const { data: responseData } = await axios.delete(`booking/${id}`);
    return responseData;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const addMovie = async (data) => {
  // const { title, description, releaseDate, posterUrl, featured, actors } = data;
  // console.log(data);
  try {
    const { data: responseData } = await axios.post("/movie", {
      title :data.title,
      description : data.description,
      releaseDate :data.releaseDate,
      posterUrl : data.posterUrl,
      featured : data.featured,
      actors :data.actors,
      admin : localStorage.getItem("adminId")
    }, {
      headers : {
        Authorization : `Bearer ${localStorage.getItem("token")}`
      }
    });
    return responseData
    
  } catch (error) {
    console.log(error);
    return
  }
};


export const  getAdminById = async() =>{
  const id = localStorage.getItem("adminId");
  try {
    const {data: responseData} = await axios.get(`/admin/${id}`)
    return responseData
  } catch (error) {
    console.log(error);
    return
  }
}


export const deleteMoviById = async(id) => {
  try {
    const {data: responseData} = await axios.delete(`/movie/${id}`)
    return responseData
  } catch (error) {
    console.log(error);
    return
  }
}