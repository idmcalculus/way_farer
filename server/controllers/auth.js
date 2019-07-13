import jwt from 'jsonwebtoken';
import pool from '../models/pool'

const auth = {
    signup: (req, res) => {
        const {
            email, first_name, last_name, password,
          } = req.body;
      let user;
          // check if user is already registered
          pool.query(
            'SELECT * FROM users WHERE email = ($1)', [email],
          ).then((result)=> {
              user = result;
          });
          if (user.rowCount !== 0) {
            return res.status(409).send({
              status: "error",
              error: "user already exists",
            });
          }
          
          pool.query(
            `INSERT INTO "users" ("firstname", "lastname", "email", "password", "address")
            VALUES ('${first_name}','${last_name}', '${email}', '${password}') 
            RETURNING *`,
          ).then((result)=> {
            user = result;
        });
      
          const {
            id, is_admin,
          } = user.rows[0];
      
          const token = jwt.sign({
            _id: id,
            _email: user.rows[0].email,
            _isadmin: is_admin,
          }, "hidelater");
      
          res.header('token', token).send({
            status: "success",
            data: {
              token, user_id: id, is_admin,
            },
          });
    },
    signin: (req, res) => {
        const { email, password } = req.body;
        // query the database
        let user;
        pool.query(
          'SELECT * FROM users WHERE email = ($1)', [email],
        ).then((result) => {
            user = result;
        });
        if (user.rowCount !== 1) return res.status(400).send({ status: "error", error: "invalid email or password" });
    
       
        if (password !== user.rows[0].password) return res.status(400).send({ status: "error", error: "invalid email or password" });
    
        const {
          id, is_admin, email: _email,
        } = user.rows[0];
    
        const token = jwt.sign({
          _id: id,
          _email,
          _isadmin: is_admin,
        }, "hidelater");
    
        res.send({
          status: 200,
          data: {
            token, id, is_admin,
          },
        });
    }
};
export default auth;