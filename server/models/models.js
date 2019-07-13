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
    pool.query(`${usersTable}`)
    .then()
    .catch();
};
export default models;