import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMovieDetails, newBooking } from "../../lib/api";
import { Box, Button, FormLabel, TextField, Typography } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import { getError } from "../../lib/utils";

function Booking() {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);
  const [values, setValues] = useState({
    seatNumber : '',
    date : ''
  });
  const navigate = useNavigate()
  const handleChange = (e) => {
    setValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }
  
  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
         const data =  await newBooking({ ...values, movie: movie._id });
          toast.success(`you scuccesfully Booked ${data.movie.title}`)
          navigate("/")
    } catch (error) {
      toast.error(getError(error))
    }    
  }
  useEffect(() => {
    async function fetchData() {
      const data = await getMovieDetails(id);
      setMovie(data.movie);
    }
    fetchData();
  }, []);
  
 
  return (
    <>
    <Helmet>
      <title>Booking </title>
    </Helmet>
      <Box>
        {movie && (
          <Fragment>
            <Typography padding={2} textAlign={"center"} variant="h4">
              Book Now {movie.title}
            </Typography>
            <Box display={"flex"} justifyContent={"center"}>
              <Box
                display={"flex"}
                flexDirection={"column"}
                width={"50%"}
                marginRight={"auto"}
              >
                <img
                  width={"80%"}
                  height={"280px"}
                  src={movie.posterUrl}
                  alt={movie.title}
                />
                <Box width={"80%"} marginTop={3} padding={2}>
                  <Typography paddingTop={2} fontWeight={"bolder"} color={'black'}>
                    {movie.description}
                  </Typography>
                  <Typography fontWeight={"bolder"} marginTop={1} color={'royalblue'}>
                    Stars :
                    {movie.actors &&
                      movie.actors.map((actor) => " " + actor + " ")}
                  </Typography>
                  <Typography fontWeight={"bolder"} color={"gray"}>
                    Release Date {new Date(movie.releaseDate).toDateString()}
                  </Typography>
                </Box>
              </Box>
              <Box width={"50%"} paddingTop={4}>
                <form onSubmit={handleSubmit}>
                  <Box
                    padding={5}
                    margin={"auto"}
                    display={"flex"}
                    flexDirection={"column"}
                  >
                    <FormLabel>Seat Number</FormLabel>
                    <TextField
                    required
                      name="seatNumber"
                      type="number"
                      margin="normal"
                      variant="standard"
                      value={values.seatNumber}
                      onChange={handleChange}
                      inputProps={{min : 1}}
                    />
                    <FormLabel>Booking Date</FormLabel>
                    <TextField
                      name="date"
                      type="date"
                      margin="normal"
                      variant="standard"
                      value={values.date}
                      onChange={handleChange}
                      required
                    />
                    <Button type="submit" sx={{ marginTop: 3 }} >
                      Book Now
                    </Button>
                  </Box>
                </form>
              </Box>
            </Box>
          </Fragment>
        )}
      </Box>
    </>
  );
}

export default Booking;
