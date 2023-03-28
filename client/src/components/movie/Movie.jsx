import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { getAllMovies } from "../../lib/api";
import MovieItem from "./movieItem";
import { Helmet } from "react-helmet-async";
function Movie() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    async function fetechData() {
      const data = await getAllMovies();
      setMovies(data.movies);
    }
    fetechData();
  }, []);
  return (
    <>
      <Helmet>
        <title>All Movie</title>
      </Helmet>
      <Box margin={"auto"} marginTop={4}>
        <Typography
          margin={"auto"}
          variant="h4"
          textAlign={"center"}
          bgcolor={"blueviolet"}
          width={"40%"}
          color={"white"}
          padding={2}
        >
          All Movies
        </Typography>
        <Box
          display={"flex"}
          gap={3}
          justifyContent={"flex-start"}
          width={"100%"}
          margin={"auto"}
          marginLeft={5}
          marginTop={5}
          flexWrap={"wrap"}
        >
          {movies &&
            movies.map(({ title, releaseDate, posterUrl, _id }, idx) => (
              <MovieItem
                key={idx}
                title={title}
                posterUrl={posterUrl}
                releaseDate={releaseDate}
                id={_id}
              />
            ))}
        </Box>
      </Box>
    </>
  );
}

export default Movie;
