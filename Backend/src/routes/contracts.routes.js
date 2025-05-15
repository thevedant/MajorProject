import express from 'express';
const router = express.Router();
import { createKyc, getKycIssuedFromUser } from '../controllers/contracts.controller.js';


router.get('/:hashAddress', getKycIssuedFromUser);
router.post('/add' , createKyc);

export default router;