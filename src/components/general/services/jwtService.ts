import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { IUser } from '../../users/interfaces';
import config from '../../../config';

const tempSecret = uuidv4();

const jwtService = {
  sign: async (user: IUser) => {
    const payload = {
      id: user.id,
      role: user.role,
    };
    const token = await jwt.sign(
      payload, config.jwt.secret || tempSecret, { expiresIn: config.jwt.expiresIn },
    );
    return token;
  },
  verify: async (token: string) => {
    try {
      const verify = await jwt.verify(token, config.jwt.secret || tempSecret);
      return verify;
    } catch (error) {
      // console.log(error);
      return false;
    }
  },
};

export default jwtService;
