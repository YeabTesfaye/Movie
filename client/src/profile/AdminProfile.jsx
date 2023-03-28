import { useEffect, useState } from "react";
import { deleteMoviById, getAdminById } from "../lib/api";
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import {Helmet} from 'react-helmet-async'
import {toast} from 'react-toastify'
function AdminProfile() {
  const [admin, setAdmin] = useState();
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAdminById();
        setAdmin(data.admin);
  
      } catch (error) {
        console.log(error);
        return;
      }
    }
    fetchData();
  }, []);
  const handleDelete  = async(id) => {
    try {
      console.log(id);
      const data = await deleteMoviById(id);
      toast.success(`${data.movie.title} is Delted Successfully !!`)
    } catch (error) {
      toast.error(`Error In Deleting`)
      return
    }
  }
  return (
    <>
      <Helmet>
        <title>Admin Profile</title>
      </Helmet>
      <Box width={"100%"} display={"flex"} justifyContent={"space-between"}>
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
            <Box
              width={"70%"}
              display={"flex"}
              justifyContent={"space-between"}
              flexDirection={"column"}
              alignSelf={"flex-end"}
              marginRight={0}
            >
              <Typography variant="h3" textAlign={"center"} padding={2}>
                Added Movies
              </Typography>
              <Box
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"center"}
                margin={"auto"}
                marginLeft={30}
                width={"100%"}
              >
                <List>
                  {admin.addedMovies.map((movie, idx) => (
                    <ListItem
                      key={idx}
                      sx={{
                        textAlign: "center",
                        margin: 1,
                        bgcolor: "#2b2d42",
                        width: "50%",
                      }}
                    >
                      <ListItemText
                        sx={{
                          margin: 1,
                          width: "auto",
                          textAlign: "left",
                          color: "white",
                        }}
                      >
                        <span sx={{ margin: 3 }}>Title</span> {movie.title}
                      </ListItemText>
                      <ListItemText

                      sx={{color : "red"}}
                      >
                        <span sx={{margin: 3}}>
                          Delete
                        </span>

                        <IconButton
                          color="error"
                          onClick={() => handleDelete(movie._id)}
                        >
                          <DeleteForeverRoundedIcon />
                        </IconButton>
                      </ListItemText>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Box>
          </>
        )}
      </Box>
    </>
  );
}

export default AdminProfile;
