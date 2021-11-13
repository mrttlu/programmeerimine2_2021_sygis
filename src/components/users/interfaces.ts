/**
 * User interface
 */
interface NewUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'Admin' | 'User';
}

interface User extends NewUser{
  id: number;
}

interface UpdateUser {
  id: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  role?: 'Admin' | 'User';
}

export { User, UpdateUser, NewUser };
