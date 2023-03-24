import express from 'express'
import { deleteBookingById, getBookingById, newBooking } from '../controller/booking.js';

const router = express.Router();

router.post("/", newBooking);
router.get("/:id", getBookingById);
router.delete("/:id",deleteBookingById);

export default router;