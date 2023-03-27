import express from 'express'
import { addAdmin, getAdminById, getAllAdmins, login } from '../controller/admin.js';

const router = express.Router();

router.post("/signup", addAdmin);
router.post('/login', login);
router.get('/', getAllAdmins);
router.get("/:id", getAdminById)
export default router