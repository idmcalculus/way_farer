import pool from '../models/pool';

import dotenv from 'dotenv';

dotenv.config();

const bookings = {
  createBooking: (req, res) => {
    const {
      token,
      user_id,
      is_admin,
      trip_id,
      booking_id,
      bus_id,
      seat_number,
      first_name,
      last_name,
      email
    } = req.body;

    pool
      .query(
        `INSERT INTO 
    bookings(booking_id, bus_id, seat_number, first_name, last_name, email)
    VALUES($1, $2, $3, $4, $5, $6)
    RETURNING *`,
        [booking_id, bus_id, seat_number, first_name, last_name, email]
      )
      .then(result => {
        res.send({
          status: 'success',
          data: {
            booking_id: result.rows[0].booking_id,
            user_id: result.rows[0].id,
            trip_id: result.rows[0].id,
            bus_id: result.rows[0].bus_id,
            trip_date: result.rows[0].trip_date,
            seat_number: result.rows[0].seat_number,
            first_name: result.rows[0].first_number,
            last_name: result.rows[0].last_name,
            email: result.rows[0].email
          }
        });
      })
      .catch(err => {
        res.status(500).send({
          status: 'error',
          error: 'internal server error'
        });
      });
  },
  getBookings: (req, res) => {
    pool
      .query(`SELECT * FROM bookings;`)
      .then(result => {
        res.send({
          status: 'success',
          data: result.rows
        });
      })
      .catch(err => {
        res.status(500).send({
          status: 'error',
          error: 'internal server error'
        });
      });
  },

  deleteBookings: (req, res) => {
    const bookingId = req.params.bookingId;
    pool
      .query(
        `DELETE FROM bookings WHERE booking_id = ($1)
        RETURNING *;`,
        [bookingId]
      )
      .then(result => {
        res.status(201).send({
          status: 'success',
          data: {
            message: 'Booking deleted successfuly'
          }
        });
      })
      .catch(err => {
        res.status(500).send({
          status: 'error',
          error: 'internal server error'
        });
      });
  }
};
export default bookings;
