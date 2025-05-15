import express from 'express';
import { createOrganization, getOrganization } from '../controllers/org.controller.js';
const router =express.Router();


router.post("/register" , createOrganization);
router.post("/login" , getOrganization);


export default router