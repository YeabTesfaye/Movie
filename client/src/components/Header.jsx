import {
  AppBar,
  Autocomplete,
  Box,
  Button,
  Tab,
  Tabs,
  TextField,
  Toolbar,
} from "@mui/material";
import MovieIcon from "@mui/icons-material/Movie";
import { useEffect, useState } from "react";
import { getAllMovies } from "../lib/api";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminActions, userActions } from "../store";
function Header() {
  const [value, setValue] = useState(0);
  const [movies, setMovies] = useState([]);
  const dispathch  = useDispatch()
  const isAdminloggedIn = useSelector((state) => state.admin.isloggedIn);
  const isUserloggedIn = useSelector((state) => state.user.isloggedIn);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    async function fetchData() {
      const data = await getAllMovies();
      setMovies(data.movies || []);
    }
    fetchData();
  }, []);

const logout = (isAdmin) => {
  isAdmin ? dispathch(adminActions.logout()) : dispathch(userActions.logout());
}
  return (
    <AppBar position="sticky" sx={{ bgcolor: "#2b2d42" }}>
      <Toolbar>
        <Box width={"20%"}>
          <MovieIcon />
        </Box>
        <Box width={"30%"} margin={"auto"}>
          <Autocomplete
            options={movies && movies.map((movie) => movie.title)}
            sx={{ input: { color: "white" } }}
            renderInput={(params) => (
              <TextField
                variant="standard"
                {...params}
                placeholder="Search Your Favorite"
              />
            )}
          ></Autocomplete>
        </Box>
        <Box display={"flex"}>
          <Tabs
            textColor="inherit"
            indicatorColor="secondary"
            value={value}
            onChange={handleChange}
          >
            <Tab component={Link} to="/" label="Home" />
            <Tab component={Link} to="/movie" label="Movie" />
            {!isAdminloggedIn &&
              !isUserloggedIn && [
                <Tab key="admin" component={Link} to="/admin" label="Admin" />,
                <Tab key="auth" component={Link} to="/auth" label="Auth" />,
              ]}
            {isUserloggedIn && [
              <Tab key="profile" component={Link} to="/user" label="Profile" />,
              <Tab
                key="logout"
                onClick={() => logout(false)}
                component={Link}
                to="/"
                label="logout"
              />,
            ]}
            {isAdminloggedIn && [
              <Tab
                key="addmovie"
                component={Link}
                to="/add"
                label="Addmovie"
              />,
              <Tab
                key="profile"
                component={Link}
                to="/admin"
                label="Profile"
              />,
              <Tab
                key="logout"
                onClick={() => logout(true)}
                component={Link}
                to="/"
                label="logout"
              />,
            ]}
          </Tabs>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
