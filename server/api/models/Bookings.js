import mongoose, {Schema, model} from 'mongoose'

const BookingSchema = new Schema({
  movie: {
    type: mongoose.Types.ObjectId,
    ref: "movie",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  seatNumber: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Booking = model("Booking", BookingSchema);
export default Booking;