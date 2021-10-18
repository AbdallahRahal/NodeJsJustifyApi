import express from 'express';
import { toJustify } from '../controllers/justify.js';
import { authenticateToken } from '../middleware/auth.js';
import { wordCounter } from '../middleware/wordCounter.js';

const router = express.Router();

router.use(authenticateToken);
router.use(wordCounter);
router.post('/api/justify', toJustify);

export default router;