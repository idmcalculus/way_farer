import express from 'express';
import bookings from '../controllers/bookings';
import secure from '../middleware/secure';

const router = express.Router();

router.post('/', secure.protect, bookings.createBooking);

router.get('/', secure.protect, bookings.getBookings);
export default router;