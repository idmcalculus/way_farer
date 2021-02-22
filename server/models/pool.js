import dotenv from 'dotenv';
import { Client } from 'pg';
import "core-js/stable";
import "regenerator-runtime/runtime";

dotenv.config();

let conString = process.env.DB_URL;
let client = new Client(conString);

const pgConnect = async() => {
  try {
    await client.connect();
    const res = await client.query('SELECT $1::text as message', ['Database Connected!']);
    console.log(res.rows[0].message);
    await client.end();
  } catch (err) {
    console.log(err.stack);
  }
}

pgConnect();

module.exports = client;
