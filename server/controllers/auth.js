import jwt from 'jsonwebtoken';
import pool from '../models/pool';
import dotenv from 'dotenv';

dotenv.config();

const auth = {
  signup: (req, res) => {
    const { email, first_name, last_name, password } = req.body;

    // check if user is already registered
    pool.query('SELECT * FROM users WHERE email = ($1)', [email]).then(result => {
      if (result.rowCount !== 0) {
        return res.status(409).send({
          status: 'error',
          error: 'user already exists'
        });
      }
    });

    pool
      .query(
        `INSERT INTO "users" ("first_name", "last_name", "email", "password")
            VALUES ('${first_name}','${last_name}', '${email}', '${password}') 
            RETURNING *`
      )
      .then(result => {
        const { id, is_admin } = result.rows[0];

        const token = jwt.sign(
          {
            _id: id,
            _email: result.rows[0].email,
            _isadmin: is_admin
          },
          'hidelater'
        );

        res.header('token', token).send({
          status: 'success',
          data: {
            token,
            user_id: id,
            is_admin
          }
        });
      });
  },
  signin: (req, res) => {
    const { email, password } = req.body;
    // query the database
    pool.query('SELECT * FROM users WHERE email = ($1)', [email]).then(result => {
      if (result.rowCount !== 1)
        return res.status(400).send({ status: 'error', error: 'invalid email or password' });

      if (password !== result.rows[0].password)
        return res.status(400).send({ status: 'error', error: 'invalid email or password' });

      const { id, is_admin, email: _email } = result.rows[0];

      const token = jwt.sign(
        {
          _id: id,
          _email,
          _isadmin: is_admin
        },
        'hidelater'
      );

      res.send({
        status: 200,
        data: {
          token,
          id,
          is_admin
        }
      });
    });
  }
};
export default auth;
