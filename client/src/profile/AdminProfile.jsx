import { useEffect, useState } from "react";
import {
  getAdminById,
} from "../lib/api";
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
function AdminProfile() {
  const [admin, setAdmin] = useState();

 
  useEffect(() => {
    async function fetchData() {
     try {
        const data = await getAdminById();
        setAdmin(data.admin)
     } catch (error) {
        console.log(error);
        return
     }
    }
    fetchData();
  }, []);
  return (
    <Box width={"100%"} display={"flex"}>
      {admin && (
        <>
          <Box
            width={"30%"}
            display={"flex"}
            justifyContent={"center"}
            flexDirection={"column"}
            alignItems={"center"}
            padding={3}
          >
            <AccountCircleRoundedIcon
              sx={{ fontSize: "6rem", textAlign: "center", mr: 3 }}
            />

            <Typography
              mt={1}
              padding={1}
              width={"auto"}
              textAlign={"center"}
              border={"1px solid #ccc"}
              borderRadius={6}
            >
              Email : {admin.email}
            </Typography>
          </Box>
        </>
      )}
      {admin && admin.addedMovies.length > 0 && (
        <>
          <Box width={"70%"} display={"flex"} flexDirection={"column"}>
            <Typography variant="h3" textAlign={"center"} padding={2}>
              Added Movies
            </Typography>
            <Box
              display={"flex"}
              flexDirection={"column"}
              margin={"auto"}
              width={"80%"}
            >
              <List>
                {admin.addedMovies.map((movie, idx) => (
                  <ListItem
                    key={idx}
                    sx={{
                      bgcolor: "#00d386",
                      color: "white",
                      textAlign: "center",
                      margin: 1,
                    }}
                  >
                    <ListItemText
                      sx={{ margin: 1, width: "auto", textAlign: "left" }}
                    >
                      Movie {movie.title}
                    </ListItemText>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
}

export default AdminProfile;
