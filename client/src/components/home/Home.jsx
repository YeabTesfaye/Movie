import { Box, Typography, Button } from "@mui/material";
import move1 from "../../assets/movie1.jpg";
import { useState, useEffect } from "react";
import { getAllMovies } from "../../lib/api";
import MovieItem from "../movie/movieItem";
import {useNavigate} from 'react-router-dom'
function Home() {
  const [movies, setMovies] = useState([]);
   const navigate = useNavigate();

   const handleClick = () => {
     navigate("/movie");
   };
  useEffect(() => {
    async function fetchData() {
      const data = await getAllMovies();
      setMovies(data.movies);
    }
    fetchData();
  }, []);
  return (
    <Box margin={"auto"} marginTop={2} width={"100%"} height={"100%"}>
      <Box height={"40vh"} width={"80%"} padding={2} margin={"auto"}>
        <img
          src="https://i.ytimg.com/vi/bweRG6WueuM/maxresdefault.jpg"
          alt="Baharma"
          width={"100%"}
          height={"100%"}
        />
      </Box>
      <Box padding={5} margin={"auto"}>
        <Typography variant="h4" textAlign={"center"}>
          Latest Release
        </Typography>
        <Box
          display={"flex"}
          width={"80%"}
          justifyContent={"center"}
          flexWrap={"wrap"}
        >
          {movies &&
            movies.slice(0,4).map(({ title, releaseDate, posterUrl, _id }, idx) => (
              <MovieItem
                key={idx}
                title={title}
                posterUrl={posterUrl}
                releaseDate={releaseDate}
                id={_id}
              />
            ))}
        </Box>
        <Box display={"flex"} padding={5} margin={"auto"}>
          <Button variant="outlined" sx={{ margin: "auto", color: "#2b2d42" }} onClick={handleClick}>
            View All Movies
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
