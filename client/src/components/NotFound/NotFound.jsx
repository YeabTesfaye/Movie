import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
function NotFound() {
  return (
    <Box alignItems={"center"} textAlign={"center"} margin={"auto"}>
      <Typography>
        OOps !! The Component is Not Found <Link to={"/"}>Go Back Home</Link>
      </Typography>
    </Box>
  );
}

export default NotFound;
