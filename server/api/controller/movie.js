import Movie from "../models/Movie.js";
import handler from 'express-async-handler'
import Joi from "joi";
import { movieSchema } from "../../lib/validator.js";
import mongoose from "mongoose";
import Admin from "../models/Admin.js";


export const addMovie = handler(async(req,res) => {
    // const {error} = movieSchema.validate(req.body);
    // if (error) {
    //   return res.status(422).json({ error: error.details[0].message });
    // }

   try {
    
     const { title, description, releaseDate, posterUrl, featured, actors } = req.body;

     const movie = new Movie({
       title,
       description,
       releaseDate : new Date(`${releaseDate}`),
       posterUrl,
       featured,
       admin : req.admin.id,
       actors
     });

    const session = await mongoose.startSession()
    const adminUser = await Admin.findById(req.admin.id);
    session.startTransaction()
    await movie.save({session});
    adminUser.addedMovies.push(movie);
    await adminUser.save({session});
    await session.commitTransaction()

     return res.status(200).json({movie})
   } catch (err) {
    return res.status(500).json({
        message : err.message
    })
   }
})


export const getMovies = handler(async(req,res) => {
    try {
        const movies = await Movie.find()
        return res.status(200).json({movies})
    } catch (err) {
        return res.status(500).json({
            message : err.message
        })
    }
})

export const getMoviesById = handler(async(req,res) => {
    try {
        const {id} = req.params;
        const movie = await Movie.findById(id);
        if(!movie){
            return res.status(404).json({
                message : "Move Not Found"
            })
        }
        return res.status(200).json({movie})
    } catch (err) {
        return res.status(500).json({
            message : err.message
        })
    }
})