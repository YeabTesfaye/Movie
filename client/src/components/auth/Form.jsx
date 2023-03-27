import {
  Box,
  Button,
  Dialog,
  FormLabel,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

function AuthForm({ onSubmit, isAdmin }) {
  const [isSignup, setIsSignup] = useState(false);
  const [values, setValues] = useState({
    name: "",
    password: "",
    email: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({values, signup : isAdmin ? false : isSignup});
  };

  return (
    <Dialog PaperProps={{ style: { borderRadius: 20 } }} open={true}>
      <Box ml={"auto"} padding={1}>
        <IconButton>
          <CloseRoundedIcon />
        </IconButton>
      </Box>
      <Typography variant="h4" textAlign={"center"}>
        {!isAdmin && isSignup ? "Signup" : "Login"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box
          padding={6}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          flexDirection={"column"}
          width={400}
          margin={"auto"}
        >
          {!isAdmin && isSignup && (
            <>
              {" "}
              <FormLabel
                variant="standard"
                sx={{ marginTop: 1, marginBottom: 1 }}
              >
                Name
              </FormLabel>
              <TextField
                value={values.name}
                onChange={handleChange}
                margin="normal"
                variant="standard"
                type="text"
                name="name"
              />
            </>
          )}
          <FormLabel variant="standard" sx={{ marginTop: 1, marginBottom: 1 }}>
            Email
          </FormLabel>
          <TextField
            value={values.email}
            onChange={handleChange}
            margin="normal"
            variant="standard"
            type="email"
            name="email"
          />
          <FormLabel sx={{ marginTop: 1, marginBottom: 1 }}>Password</FormLabel>
          <TextField
            value={values.password}
            onChange={handleChange}
            margin="normal"
            variant="standard"
            type={showPassword ? "text" : "password"}
            name="password"
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              ),
            }}
          />
          <Button
            sx={{ mt: 2, borderRadius: 10, bgcolor: "#2b2d42" }}
            variant="contained"
            type="submit"
            fullWidth
          >
            {isSignup ? "Signup" : "Login"}
          </Button>

          {!isAdmin && (
            <Button
              onClick={() => setIsSignup(!isSignup)}
              sx={{ mt: 2, borderRadius: 10 }}
              fullWidth
            >
              switch To {isSignup ? "Login" : "signup"}
            </Button>
          )}
        </Box>
      </form>
    </Dialog>
  );
}

export default AuthForm;
