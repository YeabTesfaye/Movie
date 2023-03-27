import * as React from "react";

import {Card, CardActions, CardContent,Button,Typography} from '@mui/material'
import { Link } from "react-router-dom";
export default function MovieItem({ title, releaseDate, posterUrl, id}) {
  return (
    <Card sx={{ width: 250 , height: 320, borderRadius: 5, margin:2, ":hover": {
      boxShadow: "10px 10px 15px #ccc"
    } }}>
      <img src={posterUrl} width={'100%'} height={'50%'} style={{objectFit :"cover"}} alt={title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {new Date(releaseDate).toDateString()}
        </Typography>
      </CardContent>
      <CardActions sx={{display:"flex", justifyContent: "center", alignItems :"center"}} >
        <Button size="large" LinkComponent={Link} to={`/booking/${id}`} sx={{textAlign: "center"}}>Book</Button>
      </CardActions>
    </Card>
  );
}
