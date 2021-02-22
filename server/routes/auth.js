import express from 'express';
import auth from '../controllers/auth';

const router = express.Router();

router.post('/signup', auth.signup);
router.post('/signin', auth.signin);

export default router;