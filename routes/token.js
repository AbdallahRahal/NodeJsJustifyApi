import express from 'express';

import { getToken } from '../controllers/token.js';

const router = express.Router();

router.post('/api/token', getToken);


export default router;