import express from 'express';
const router =express.Router();
import { decideRequest, generateRequest  , searchRequests} from '../controllers/request.controller.js';

router.get('/search', searchRequests);
router.post('/:senderHashAddress', generateRequest);
router.put('/take/:requestId' ,decideRequest );

export default router;
