import express from 'express'
import { addAdmin, getAllAdmins, login } from '../controller/admin.js';

const router = express.Router();

router.post("/signup", addAdmin);
router.post('/login', login);
router.get('/', getAllAdmins);

export default router