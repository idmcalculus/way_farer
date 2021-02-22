import express from 'express';
import trips from '../controllers/trips';
import secure from '../middleware/secure';

const router = express.Router();

router.post('/', secure.protect, trips.createTrip);
router.get('/', secure.protect, trips.getTrips);
router.patch('/:tripId', secure.protect, trips.updateTrips);

export default router;