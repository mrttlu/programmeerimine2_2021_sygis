import pool from '../../database';
import db from '../../db';
import { UpdateUser, NewUser } from './interfaces';
import hashService from '../general/services/hashService';

const usersService = {
  getAllUsers: async () => {
    const [users] = await pool.query('SELECT id, firstName, lastName, email, dateCreated, role FROM users WHERE dateDeleted IS NULL');
    return users;
  },
  /**
   * Returns user or undefined
   */
  getUserById: async (id: number) => {
    const [user]: any = await pool.query(
      'SELECT id, firstName, lastName, email, dateCreated, dateUpdated, dateDeleted FROM users WHERE id = ? AND dateDeleted IS NULL', [id],
    );
    return user[0];
  },
  getUserByEmail: async (email: string) => {
    const [user]: any = await pool.query('SELECT * FROM users WHERE email = ? AND dateDeleted IS NULL', [email]);
    return user[0];
  },
  removeUser: async (id: number) => {
    try {
      const result = await pool.query('UPDATE users SET dateDeleted = ? WHERE id = ?', [new Date(), id]);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  createUser: async (newUser: NewUser) => {
    try {
      const hashedPassword = await hashService.hash(newUser.password);
      const user = {
        ...newUser,
        password: hashedPassword,
      };
      const [result]: any = await pool.query('INSERT INTO users SET ?', [user]);
      return result.insertId;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  updateUser: (user: UpdateUser): boolean => {
    const { id, firstName, lastName } = user;
    const index = db.users.findIndex((element) => element.id === id);
    if (firstName) {
      db.users[index].firstName = firstName;
    }
    if (lastName) {
      db.users[index].lastName = lastName;
    }
    return true;
  },
};

export default usersService;
