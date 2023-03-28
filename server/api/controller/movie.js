import Movie from "../models/Movie.js";
import handler from "express-async-handler";
import Joi from "joi";
import { movieSchema } from "../../lib/validator.js";
import mongoose from "mongoose";
import Admin from "../models/Admin.js";

export const addMovie = handler(async (req, res) => {
  try {
    const { title, description, releaseDate, posterUrl, featured, actors } =
      req.body;

    const movie = new Movie({
      title,
      description,
      releaseDate: new Date(`${releaseDate}`),
      posterUrl,
      featured,
      admin: req.admin.id,
      actors,
    });

    const session = await mongoose.startSession();
    const adminUser = await Admin.findById(req.admin.id);
    session.startTransaction();
    await movie.save({ session });
    adminUser.addedMovies.push(movie);
    await adminUser.save({ session });
    await session.commitTransaction();

    return res.status(200).json({ movie });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

export const getMovies = handler(async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const movies = await Movie.find()
      .skip((page - 1) * pageSize)
      .limit(pageSize);
    return res.status(200).json({ movies });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

export const getMoviesById = handler(async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id);
    if (!movie) {
      return res.status(404).json({
        message: "Move Not Found",
      });
    }
    return res.status(200).json({ movie });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

export const delteMovieById = handler(async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findByIdAndDelete(id);
    if (!movie) {
      return res.status(404).json({
        message: "Movie Not Found",
      });
    }
    return res.status(200).json({ movie });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});
