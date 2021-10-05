/**
 * User interface
 */
interface NewUser {
  firstName: string;
  lastName: string;
}

interface User extends NewUser{
  id: number;
}

interface UpdateUser {
  id: number;
  firstName?: string;
  lastName?: string;
}

export { User, UpdateUser, NewUser };
