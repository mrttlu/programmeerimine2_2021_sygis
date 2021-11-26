/* eslint-disable no-console */
import { FieldPacket, ResultSetHeader } from 'mysql2';
import pool from '../../database';
import { IUpdateUser, INewUser, IUser } from './interfaces';
import hashService from '../general/services/hashService';

const usersService = {
  getAllUsers: async () => {
    const [users] = await pool.query('SELECT id, firstName, lastName, email, dateCreated, role FROM users WHERE dateDeleted IS NULL');
    return users;
  },
  /**
   * Returns user or undefined
   */
  getUserById: async (id: number): Promise<IUser | false> => {
    try {
      const [users]: [IUser[], FieldPacket[]] = await pool.query(
        'SELECT id, firstName, lastName, email, dateCreated, dateUpdated, dateDeleted FROM users WHERE id = ? AND dateDeleted IS NULL LIMIT 1', [id],
      );
      return users[0];
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  getUserByEmail: async (email: string): Promise<IUser | false> => {
    try {
      const [user]: [IUser[], FieldPacket[]] = await pool.query('SELECT * FROM users WHERE email = ? AND dateDeleted IS NULL', [email]);
      return user[0];
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  removeUser: async (id: number): Promise<boolean> => {
    try {
      await pool.query('UPDATE users SET dateDeleted = ? WHERE id = ?', [new Date(), id]);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  createUser: async (newUser: INewUser): Promise<number | false> => {
    try {
      const hashedPassword = await hashService.hash(newUser.password);
      const user = {
        ...newUser,
        password: hashedPassword,
      };
      const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query('INSERT INTO users SET ?', [user]);
      return result.insertId;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  updateUser: async (user: IUpdateUser): Promise<boolean> => {
    try {
      const userToUpdate = { ...user };
      if (user.password) userToUpdate.password = await hashService.hash(user.password);
      const result = await pool.query('UPDATE users SET ? WHERE id = ?', [userToUpdate, user.id]);
      console.log(result);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
};

export default usersService;
