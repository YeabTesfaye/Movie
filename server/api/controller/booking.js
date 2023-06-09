import Booking from "../models/Bookings.js";
import handler from "express-async-handler";
import User from "../models/User.js";
import Movie from "../models/Movie.js";
import mongoose from "mongoose";

export const newBooking = handler(async (req, res) => {
  const { movie, date, seatNumber, user } = req.body;

  try {
    const userExist = await User.findById(user);
    const movieExist = await Movie.findById(movie);

    if (!userExist) {
      return res.status(404).json({
        message: "User Not Found !!",
      });
    }
    if (!movieExist) {
      return res.status(404).json({
        message: "Movie Not Found !!",
      });
    }

    const booking = new Booking({
      movie,
      seatNumber,
      date: new Date(`${date}`),
      user,
    });

    const session = await mongoose.startSession();
    session.startTransaction();

    userExist.bookings.push(booking);
    movieExist.bookings.push(booking);
    await userExist.save({ session });
    await movieExist.save({ session });
    await booking.save({ session });

    session.commitTransaction();
    return res.status(201).json({movie : movieExist});
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

export const getBookingById = handler(async (req, res) => {
  const { id } = req.params;
  try {
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({
        message: "Booking Not Found !!",
      });
    }
    return res.status(200).json({ booking });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

export const deleteBookingById = async (req, res) => {
  const { id } = req.params;

  try {
    const booking = await Booking.findById(id)
      .populate("user", "bookings")
      .populate("movie", "bookings");
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const user = booking.user;
    user.bookings.pull(id);
    await user.save();

    const movie = booking.movie;
    movie.bookings.pull(id);
    await movie.save();

    await booking.deleteOne();

    return res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



// export const deleteBookingById = handler(async (req, res) => {
//   const { id } = req.params;
//   const session = await mongoose.startSession();
//   try {
//     session.startTransaction();
//     const booking = await Booking.findById(id)
//       .session(session)
//       .populate("user movie");
//     if (!booking) {
//       return res.status(404).json({ message: "Booking not found" });
//     }

//     await booking.user.bookings.pull(booking);
//     await booking.movie.bookings.pull(booking);
//     await booking.user.save({ session });
//     await booking.movie.save({ session });
//     await booking.deleteOne({ session });

//     if (session.state === "TRANSACTION_IN_PROGRESS") {
//       await session.commitTransaction();
//     }

//     return res.status(200).json({ message: "Booking deleted successfully" });
//   } catch (err) {
//     await session.abortTransaction();
//     return res.status(500).json({ message: err.message });
//   } finally {
//     session.endSession();
//   }
// });
