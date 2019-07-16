import express, { json, urlencoded } from 'express';
import auth from './routes/auth';
import trips from './routes/trips';
import bookings from './routes/bookings';
import models from './models/models';

const app = express();
//use middlewares
app.use(json());
app.use(urlencoded({ extended: true }));

// mount routers
app.use('/api/v1/auth', auth);
app.use('/api/v1/trips', trips);
app.use('/api/v1/bookings', bookings);

//create database tables
models();

app.get('/', (req, res) => {
  return res.status(200).send({ message: 'We are LIVE!!!' });
});

let port = process.env.PORT;
if (port == null || port == '') {
  port = 8000;
}
const server = app.listen(port, () => console.log(`Listening on port ${port}...`));
export default server;
