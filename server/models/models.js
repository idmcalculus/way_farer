import pool from './pool';

pool.on('connect', () => {
  console.log('Connected to the database');
});

const models = `DROP TABLE IF EXISTS bookings, trips, users CASCADE;

  CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        first_name VARCHAR NOT NULL,
        last_name VARCHAR NOT NULL,
        email VARCHAR NOT NULL UNIQUE,
        password VARCHAR NOT NULL,
        is_admin BOOLEAN NOT NULL DEFAULT true
    )
  CREATE TABLE IF NOT EXISTS trips(
        id SERIAL PRIMARY KEY,
        bus_id INTEGER NOT NULL,
        origin VARCHAR NOT NULL,
        destination VARCHAR NOT NULL,
        trip_date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        fare NUMERIC(15,2) NOT NULL,
        status VARCHAR NOT NULL DEFAULT 'active'
    )
  CREATE TABLE IF NOT EXISTS bookings(
        booking_id INTEGER NOT NULL,
        id SERIAL PRIMARY KEY,        
        bus_id INTEGER NOT NULL,
        trip_date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        seat_number INTEGER NOT NULL,
        first_name VARCHAR NOT NULL,
        last_name VARCHAR NOT NULL,
        email VARCHAR NOT NULL UNIQUE,
        status VARCHAR NOT NULL DEFAULT 'active'
    );`;
pool
  .query(models)
  .then(res => {
    console.log(res);
    pool.end();
  })
  .catch(err => {
    console.log(err);
    pool.end();
  });
export default models;
