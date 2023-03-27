import { useEffect, useState } from "react";
import {
  getAllMovies,
  getBookingsOfUser,
  deteteBooking,
  getUserById,
} from "../lib/api";
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
  colors,
} from "@mui/material";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
function UserProfile() {
  const [bookings, setBoookings] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState("")


  const handleDelete  = async(id) => {
   try {
     const data = await deteteBooking(id);
     console.log(data);
   } catch (error) {
    console.log(error);
    return
   }
  } 
  useEffect(() => {
    async function fetchData() {
      const data = await getBookingsOfUser();
      setBoookings(data.bookings || []);

      const responserData = await getUserById();
      setName(responserData.user.name || "");
      setEmail(responserData.user.email || "");
      setUser(responserData.user)
    }
    fetchData();
  }, []);
  return (
    <Box width={"100%"} display={"flex"}>
      {user && (
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
              padding={1}
              width={"auto"}
              textAlign={"center"}
              border={"1px solid #ccc"}
              borderRadius={6}
            >
              Name : {name}
            </Typography>
            <Typography
              mt={1}
              padding={1}
              width={"auto"}
              textAlign={"center"}
              border={"1px solid #ccc"}
              borderRadius={6}
            >
              Email : {email}
            </Typography>
          </Box>
        </>
      )}
      {bookings && bookings.length > 0 && (
        <>
          <Box width={"70%"} display={"flex"} flexDirection={"column"}>
            <Typography variant="h3" textAlign={"center"} padding={2}>
              Bookings
            </Typography>
            <Box
              display={"flex"}
              flexDirection={"column"}
              margin={"auto"}
              width={"80%"}
            >
              <List>
                {bookings.map((booking, idx) => (
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
                      Movie {booking.movie.title}
                    </ListItemText>
                    <ListItemText
                      sx={{ margin: 1, width: "auto", textAlign: "left" }}
                    >
                      Seat {booking.seatNumber}
                    </ListItemText>
                    <ListItemText
                      sx={{ margin: 1, width: "auto", textAlign: "left" }}
                    >
                      Date{new Date(booking.date).toDateString()}
                    </ListItemText>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(booking._id)}
                    >
                      <DeleteForeverIcon />
                    </IconButton>
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

export default UserProfile;
