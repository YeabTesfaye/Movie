import express from 'express'
import { addUsers, deleteUsers, getAllUsers, login, updateUser } from '../controller/user.js'
const router = express.Router()

router.get('/', getAllUsers);
router.post('/signup', addUsers)
router.put("/:id", updateUser);
router.delete("/:id", deleteUsers);
router.post("/login", login);

export default router