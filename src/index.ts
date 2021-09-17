/**
 * Import express framewrok
 */
import express, { Request, Response, Application } from 'express';
import cors from 'cors';

/**
 * Create express app
 */
const app: Application = express();

/**
 * Middleware for creating request body object
 */
app.use(express.json());
app.use(cors());

/**
 * Port number for express app
 */
const port = 3000;

/**
 * Http response codes
 */
const responseCodes = {
  ok: 200,
  created: 201,
  noContent: 204,
  badRequest: 400,
  notFound: 404,
};

/**
 * User interface
 */
interface User {
  id: number;
  firstName: string;
  lastName: string;
}

/**
 * Category interface
 */
interface Category {
  id: number;
  name: string;
  createdBy: number;
}

/**
 * Excuse interface
 */
interface Excuse {
  id: number;
  description: string;
  createdBy: number;
  category: number;
  public: boolean;
}

/**
 * Database interface
 */
interface Db {
  users: User[];
  categories: Category[];
  excuses: Excuse[];
}

/**
 * Mock database
 */
const db: Db = {
  users: [
    {
      id: 1,
      firstName: 'Juku',
      lastName: 'Juurikas',
    },
    {
      id: 2,
      firstName: 'Mari',
      lastName: 'Maasikas',
    },
  ],
  categories: [
    {
      id: 1,
      name: 'Kool',
      createdBy: 1,
    },
    {
      id: 2,
      name: 'Kodu',
      createdBy: 2,
    },
  ],
  excuses: [
    {
      id: 1,
      description: 'Ei viitsinud teha',
      category: 1,
      createdBy: 1,
      public: true,
    },
  ],
};

/**
 * API test endpoint
 */
app.get('/ping', (req: Request, res: Response) => {
  res.status(responseCodes.ok).json({
    message: 'Alive',
  });
});

/**
 * Get all users
 */
app.get('/users', (req: Request, res: Response) => {
  const { users } = db;
  return res.status(responseCodes.ok).json({
    users,
  });
});

/**
 * Get user by id
 */
app.get('/users/:id', (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  if (!id) {
    return res.status(responseCodes.badRequest).json({
      error: 'No valid id provided',
    });
  }
  const user = db.users.find((element) => element.id === id);
  if (!user) {
    return res.status(responseCodes.badRequest).json({
      error: `No user found with id: ${id}`,
    });
  }
  return res.status(responseCodes.ok).json({
    user,
  });
});

/**
 * Remove user by id
 */
app.delete('/users/:id', (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  if (!id) {
    return res.status(responseCodes.badRequest).json({
      error: 'No valid id provided',
    });
  }
  const index = db.users.findIndex((element) => element.id === id);
  if (index < 0) {
    return res.status(responseCodes.badRequest).json({
      message: `User not found with id: ${id}`,
    });
  }
  db.users.splice(index, 1);
  return res.status(responseCodes.noContent).json({});
});

/**
 * Create user
 */
app.post('/users', (req: Request, res: Response) => {
  const { firstName, lastName } = req.body;
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
  const id = db.users.length + 1;
  db.users.push({
    id,
    firstName,
    lastName,
  });
  return res.status(responseCodes.created).json({
    id,
  });
});

/**
 * Update user
 */
app.patch('/users/:id', (req: Request, res: Response) => {
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
  const index = db.users.findIndex((element) => element.id === id);
  if (index < 0) {
    return res.status(responseCodes.badRequest).json({
      error: `No user found with id: ${id}`,
    });
  }
  if (firstName) {
    db.users[index].firstName = firstName;
  }
  if (lastName) {
    db.users[index].lastName = lastName;
  }
  return res.status(responseCodes.noContent).json({});
});

/**
 * Start listening
 */
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
