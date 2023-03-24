import {Schema, model} from 'mongoose'

const BookingSchema = new Schema({
    movie : {
        type : String, 
        required : true
    },
    date : {
        type : Date,
        required : true
    },
    seatNumber : {
        type  : Number,
        required : true
    },
    user : {
        type : String,
        required : true
    }
})

const Booking = model("Booking", BookingSchema);
export default Booking;