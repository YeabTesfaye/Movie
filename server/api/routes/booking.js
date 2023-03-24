import express from 'express'
import { newBooking } from '../controller/booking.js';

const router = express.Router();

router.post("/", newBooking);


export default router