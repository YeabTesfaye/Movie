import { Box, Typography, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { getAllMovies } from "../../lib/api";
import MovieItem from "../movie/movieItem";
import {useNavigate} from 'react-router-dom'
import { Helmet } from "react-helmet-async";
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
    <>
      <Helmet>
        <title>FilmFinder</title>
      </Helmet>
      <Box margin={"auto"} marginTop={2} width={"100%"} height={"100%"}>
        <Box height={"40vh"} width={"80%"} padding={2} margin={"auto"}>
          <img
            src="https://i.ytimg.com/vi/bweRG6WueuM/maxresdefault.jpg"
            alt="Baharma"
            width={"100%"}
            height={"100%"}
          />
        </Box>
        <Box
          padding={2}
          margin={"auto"}
          marginRight={"150"}
          marginLeft={"150px"}
        >
          <Typography variant="h4" textAlign={"center"}>
            Latest Release
          </Typography>
          <Box
            display={"flex"}
            width={"90%"}
            justifyContent={"space-between"}
            flexWrap={"wrap"}
            gap={1.75}
            alignItems={"center"}
          >
            {movies &&
              movies
                .slice(0, 4)
                .map(({ title, releaseDate, posterUrl, _id }, idx) => (
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
            <Button
              variant="outlined"
              sx={{ margin: "auto", color: "#2b2d42", bgcolor : "#ccc" }}
              onClick={handleClick}
            >
              View All Movies
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Home;
