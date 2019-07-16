import pool from './pool';

const models = () => {
  const usersTable = `CREATE TABLE IF NOT EXISTS users(
      id SERIAL PRIMARY KEY,
      first_name VARCHAR NOT NULL,
      last_name VARCHAR NOT NULL,
      email VARCHAR NOT NULL UNIQUE,
      password VARCHAR NOT NULL,
      is_admin BOOLEAN NOT NULL DEFAULT false
  );`;
  const tripsTable = `CREATE TABLE IF NOT EXISTS trips(
      id SERIAL PRIMARY KEY,
      bus_id INTEGER NOT NULL,
      origin VARCHAR NOT NULL,
      destination VARCHAR NOT NULL,
      trip_date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
      fare NUMERIC(15,2) NOT NULL,
      status VARCHAR NOT NULL DEFAULT 'active'
  );`;
  const bookingsTable = `CREATE TABLE IF NOT EXISTS bookings(
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
    .query(
      `${usersTable}
              ${tripsTable}
              ${bookingsTable}`
    )
    .then()
    .catch();
};

export default models;
