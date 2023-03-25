import React, { useEffect, useState } from "react";
import { AppBar, Autocomplete, Box, Toolbar, TextField, Tabs, Tab } from "@mui/material";
import { getAllMovies } from "../lib/api";
import MovieIcon from "@mui/icons-material/Movie";
import {Link} from 'react-router-dom'
export default function Header() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const data = await getAllMovies();
      setMovies(data.movies);
      console.log(data);
    }
    fetchData();
  }, []);

  const [value, setValue] = useState(0);

  const handleChange = (event, value)  => {
    setValue(value)
  }

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#9fa2bf" }}>
      <Toolbar>
        <Box width={"20%"}>
          <MovieIcon />
        </Box>
        <Box width={"30%"} margin={"auto"}>
          <Autocomplete
            options={movies && movies.map((movie) => movie.title)}
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{ input: { color: "#dfe4e6" } }}
                variant="standard"
                placeholder="Search Your Favorite Movie"
              />
            )}
          ></Autocomplete>
        </Box>
        <Box display={"flex"}>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="inherit"
            indicatorColor="secondary"
          >
            <Tab label="Movie" component={Link} to="/movie" />
            <Tab label="Admin" component={Link} to="/admin" />
            <Tab label="Auth" component={Link} to="/auth" />
          </Tabs>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
