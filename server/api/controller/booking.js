import Booking from "../models/Bookings.js";
import handler from 'express-async-handler'
export const newBooking = handler(async(req, res) => {
    
    const { movie, date, seatNumber , user} = req.body;

    try {
        const booking = new Booking({
            movie,
            seatNumber,
            date : new Date(`${date}`) ,
            user
        });
        await booking.save();
        return res.status(201).json({booking});
    } catch (err) {
        return res.status(500).json({
            message : err.message
        })
    }
})
