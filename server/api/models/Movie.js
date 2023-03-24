import mongoose, { Schema, model } from "mongoose";

const MovieSchema = new Schema({
  title: {
    type: String,
    required: true,
    // trim: true,
  },
  actors : [{type : String, required : true}],
  description: {
    type: String,
    required: true,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  posterUrl: {
    type: String,
    required: true,
  },
  featured: {
    type: Boolean,
  },
  bookings: [{ type: String }],
  admin: {
    type: mongoose.Types.ObjectId,
    ref : "Admin",
    required: true,
  },
});


const Movie = model("Movie", MovieSchema);
export default Movie;