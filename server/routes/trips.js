import express from 'express';
import trips from '../controllers/trips';
import secure from '../middleware/secure';

const router = express.Router();

router.post('/', secure.protect, trips.createTrip);

router.post('/', secure.protect, trips.getTrips);
export default router;