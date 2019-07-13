import express, { json, urlencoded } from 'express';
import auth from './routes/auth';

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use('/api/v1/auth', auth);

const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log(`Listening on port ${port}...`));
export default server;