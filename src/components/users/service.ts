import db from '../../db';
import { User, UpdateUser, NewUser } from './interfaces';

const usersService = {
  getAllUsers: (): User[] => {
    const { users } = db;
    return users;
  },
  /**
   * Returns user or undefined
   */
  getUserById: (id: number): User | undefined => {
    const user = db.users.find((element) => element.id === id);
    return user;
  },
  removeUser: (id: number): boolean => {
    const index = db.users.findIndex((element) => element.id === id);
    db.users.splice(index, 1);
    return true;
  },
  createUser: (newUser: NewUser) => {
    const id = db.users.length + 1;
    db.users.push({
      id,
      ...newUser,
    });
    return id;
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
