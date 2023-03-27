import { useEffect, useState } from "react"
import { getBookingsOfUser } from "../lib/api"

function UserProfile() {
  const [bookings, setBoookings]  = useState()
 useEffect(() => {
   async function fetchData() {
     const data = await getAllMovies();
     setBoookings(data.bookings || []);
   }
   fetchData();
 }, []);
  console.log(bookings);
  return (
    <div>UserProfile</div>
  )
}

export default UserProfile