import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

let conString = process.env.DB_URL;
let client = new pg.Client(conString);
client.connect(function(err) {
  if (err) {
    return console.error("could not connect to postgres", err);
  }
  client.query('SELECT NOW() AS "theTime"', function(err, result) {
    if (err) {
      return console.error("error running query", err);
    }
    console.log("Database Connected");
  });
});

module.exports = client;
