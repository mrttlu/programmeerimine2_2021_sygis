import mysql from 'mysql2';
import path from 'path';
import fs from 'fs';
import config from './config';

const pool = mysql.createPool({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  multipleStatements: true,
}).promise();

pool.query(`USE ${config.db.database};`).catch(() => {
  console.log('Creating database');
  const sqlPath = path.join(__dirname, '../docs/modelAndSeed.sql');
  const SQL = fs.readFileSync(sqlPath, { encoding: 'utf-8' });
  pool.query(SQL).then(() => console.log('Database created and seeded')).catch((err) => console.log(err));
});

export default pool;
