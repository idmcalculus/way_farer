import { Pool } from 'pg';
const connectionString = {
    user: "postgres",
    host: "localhost",
    database: "wayfarer",
    password: "10million",
    port: 5432,
  };

  const pool = new Pool(connectionString);

export default pool;