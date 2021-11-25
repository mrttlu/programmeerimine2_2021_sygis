import 'reflect-metadata';
import { createConnection } from 'typeorm';
import eUser from './components/users/entity';

createConnection({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'my-secret-pw',
  database: 'excuses',
  entities: [eUser],
  synchronize: true,
  logging: true,
}).then((connection) => {
  connection.getRepository(eUser).findOne({ role: 'Admin' }).then((user) => {
    if (!user) {
      const adminUser = {
        firstName: 'Admin',
        lastName: 'Admin',
        email: 'admin@admin.ee',
        password: '$2b$10$eqqC/z5dIGdcKMuvtkCHvuBZ2SwVR3r891pzBydvQzmZYguP14knS',
        role: 'Admin',
      };
      connection.getRepository(eUser).save(adminUser).then((result) => {
        console.log(result);
      }).catch((error) => {
        console.log(error);
      });
    }
  }).catch((error) => {
    console.log(error);
  });
  console.log(`Database connected to ${connection.name}`);
}).catch((error) => console.log(error));

export default createConnection;
