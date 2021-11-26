import { RowDataPacket } from 'mysql2';

/**
 * User interface
 */
interface INewUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'Admin' | 'User';
}

interface IUser extends INewUser, RowDataPacket {
  id: number;
}

interface IUpdateUser {
  id: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  role?: 'Admin' | 'User';
}

export { IUser, IUpdateUser, INewUser };
