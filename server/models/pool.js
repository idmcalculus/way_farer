import { Pool } from 'pg';
const connectionString = {
  user: 'postgres',
  host: 'localhost',
  database: 'user_db',
  password: 'ma13ka2la',
  port: 5432,
  };

  const pool = new Pool(connectionString);

export default pool;