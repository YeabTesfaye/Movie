import express from 'express'
import {
  addUsers,
  deleteUsers,
  getAllUsers,
  getBookingsOfUser,
  getUserById,
  login,
  updateUser,
} from "../controller/user.js";
const router = express.Router()

router.get('/', getAllUsers);
router.get("/:id", getUserById);
router.post('/signup', addUsers);
router.put("/:id", updateUser);
router.delete("/:id", deleteUsers);
router.post("/login", login);
router.get("/bookings/:id", getBookingsOfUser)

export default router