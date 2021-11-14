import { Request, Response } from 'express';
import responseCodes from '../general/responseCodes';
import usersService from './service';
import { UpdateUser, NewUser } from './interfaces';

const usersController = {
  getAllUsers: (req: Request, res: Response) => {
    const users = usersService.getAllUsers();
    return res.status(responseCodes.ok).json({
      users,
    });
  },
  getUserById: (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: 'No valid id provided',
      });
    }
    if ((id === res.locals.user.id) || (res.locals.user.role === 'Admin')) {
      const user = usersService.getUserById(id);
      if (!user) {
        return res.status(responseCodes.badRequest).json({
          error: `No user found with id: ${id}`,
        });
      }
      return res.status(responseCodes.ok).json({
        user,
      });
    }
    return res.status(responseCodes.notAuthorized).json({
      error: 'You have no permission for this info',
    });
  },
  removeUser: (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: 'No valid id provided',
      });
    }
    const user = usersService.getUserById(id);
    if (!user) {
      return res.status(responseCodes.badRequest).json({
        message: `User not found with id: ${id}`,
      });
    }
    usersService.removeUser(id);
    return res.status(responseCodes.noContent).json({});
  },
  createUser: async (req: Request, res: Response) => {
    const {
      firstName, lastName, password, email,
    } = req.body;
    if (!firstName) {
      return res.status(responseCodes.badRequest).json({
        error: 'First name is required',
      });
    }
    if (!lastName) {
      return res.status(responseCodes.badRequest).json({
        error: 'Last name is required',
      });
    }
    if (!email) {
      return res.status(responseCodes.badRequest).json({
        error: 'Email is required',
      });
    }
    if (!password) {
      return res.status(responseCodes.badRequest).json({
        error: 'Password is required',
      });
    }
    const newUser: NewUser = {
      firstName,
      lastName,
      email,
      password,
      role: 'User',
    };
    const id = await usersService.createUser(newUser);
    return res.status(responseCodes.created).json({
      id,
    });
  },
  updateUser: (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    const { firstName, lastName } = req.body;
    if (!id) {
      return res.status(responseCodes.badRequest).json({
        error: 'No valid id provided',
      });
    }
    if (!firstName && !lastName) {
      return res.status(responseCodes.badRequest).json({
        error: 'Nothing to update',
      });
    }
    const user = usersService.getUserById(id);
    if (!user) {
      return res.status(responseCodes.badRequest).json({
        error: `No user found with id: ${id}`,
      });
    }
    const updateUser: UpdateUser = {
      id,
      firstName,
      lastName,
    };
    usersService.updateUser(updateUser);
    return res.status(responseCodes.noContent).json({});
  },
};

export default usersController;
