import { getConnection, SimpleConsoleLogger } from 'typeorm';
import db from '../../db';
import { User, UpdateUser, NewUser } from './interfaces';
import hashService from '../general/services/hashService';
import eUser from './entity';

const connection = getConnection();

const usersService = {
  getAllUsers: async () => {
    const users = await connection.getRepository(eUser).find();
    return users;
  },
  /**
   * Returns user or undefined
   */
  getUserById: (id: number): User | undefined => {
    const user = db.users.find((element) => element.id === id);
    return user;
  },
  getUserByEmail: async (email: string) => {
    const user = await connection.getRepository(eUser).findOne({ email });
    console.log(user);
    return user;
  },
  removeUser: (id: number): boolean => {
    const index = db.users.findIndex((element) => element.id === id);
    db.users.splice(index, 1);
    return true;
  },
  createUser: async (newUser: NewUser) => {
    try {
      const hashedPassword = await hashService.hash(newUser.password);
      const user = {
        ...newUser,
        password: hashedPassword,
      };
      const result = await connection.getRepository(eUser).save(user);
      return result.id;
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
