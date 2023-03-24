import express from 'express'
import { addAdmin, login } from '../controller/admin.js';

const router = express.Router();

router.post("/signup", addAdmin);
router.post('/login', login);


export default router