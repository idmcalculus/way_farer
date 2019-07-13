import express, { json, urlencoded } from 'express';
import auth from './routes/auth';
import trips from './routes/trips';

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use('/api/v1/auth', auth);
app.use('/api/v1/trips', trips)

const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log(`Listening on port ${port}...`));
export default server;