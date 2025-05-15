import express from 'express';
import { loginUser, registerUser , getUser } from '../controllers/user.controller.js';
const router =express.Router();

router.post("/register" , registerUser);
router.post("/login" , loginUser);
router.get("/find/:hashAddress" , getUser);




export default router;
