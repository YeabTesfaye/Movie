import {
  Box,
  Button,
  Checkbox,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { addMovie } from "../../lib/api";
import { toast } from "react-toastify";

function AddMovie() {
  const labelProps = {
    mt: 1,
    mb: 1,
  };
  const initialFormValues = {
    title: "",
    description: "",
    posterUrl: "",
    releaseDate: "",
    featured: false,
  };
  const [values, setValues] = useState(initialFormValues);
  const navigate = useNavigate()
  const [actors, setActors] = useState([]);
  const [acotr, setAcotr] = useState("");
  const handleChange = (e) => {
    setValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(values.description);
    try {
      const data = await addMovie({ ...values, actors });
      setValues(initialFormValues)
      toast.success(`successfully Added ${data.movie.title}`)
      navigate("/")
    } catch (error) {
      toast.error("Error Occucred ")
      return;
    }
  };
  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Box
          width={"50%"}
          padding={10}
          margin={"auto"}
          display={"flex"}
          flexDirection={"column"}
          boxShadow={"10px 10px 20px #ccc"}
        >
          <Typography variant="h5" textAlign={"center"}>
            Add New Movie
          </Typography>
          <FormLabel sx={labelProps}>Title</FormLabel>
          <TextField
            required
            name="title"
            type="text"
            variant="standard"
            margin="normal"
            value={values.title}
            onChange={handleChange}
          />
          <FormLabel sx={labelProps}>Description</FormLabel>
          <TextField
            required
            value={values.description}
            onChange={handleChange}
            name="description"
            variant="standard"
            type="text"
            margin="normal"
          />
          <FormLabel sx={labelProps}>Poster Url</FormLabel>
          <TextField
            required
            name="posterUrl"
            variant="standard"
            type="text"
            margin="normal"
            value={values.posterUrl}
            onChange={handleChange}
          />
          <FormLabel sx={labelProps}>Release Date</FormLabel>
          <TextField
            required
            name="releaseDate"
            variant="standard"
            type="date"
            margin="normal"
            value={values.releaseDate}
            onChange={handleChange}
          />
          <FormLabel sx={labelProps}>Actor</FormLabel>
          <Box display={"flex"}>
            <TextField
              required
              value={acotr}
              name="actor"
              variant="standard"
              margin="normal"
              onChange={(e) => setAcotr(e.target.value)}
            />
            <Button
              onClick={(e) => {
                setActors([...actors, acotr]);
                setAcotr("");
              }}
            >
              Add
            </Button>
          </Box>
          <FormLabel sx={labelProps}>Featured</FormLabel>
          <Checkbox
            color="success"
            name="fetured"
            value={values.featured}
            onClick={(e) =>
              setValues((prevState) => ({
                ...prevState,
                featured: e.target.checked,
              }))
            }
            sx={{ mr: "auto" }}
          />
          <Button
            variant="contained"
            type="submit"
            sx={{
              width: "30%",
              margin: "auto",
              bgcolor: "#2b2d42",
              ":hover": {
                bgcolor: "#121217",
              },
            }}
          >
            Add New Movie
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default AddMovie;
