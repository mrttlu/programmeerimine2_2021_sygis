/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/**
 * Import express framework
 */
import express, { Request, Response, Application } from 'express';
/**
 * Swagger UI for API documentation
 */
import swaggerUi from 'swagger-ui-express';
/**
 * Import Cors (needed because of API documentation in this project)
 * What is CORS?: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
 */
import cors from 'cors';
/**
 * Import API documentation file
 */
import swaggerDocument from '../openapi.json';

import db from './db';
import usersController from './components/users/controller';

import responseCodes from './components/general/responseCodes';
import { port } from './components/general/settings';
import logger from './components/general/loggerMiddleware';
/**
 * Create express app
 */
const app: Application = express();

/**
 * Middleware for creating request body object
 */
app.use(express.json());
/**
 * Register CORS middleware
 */
app.use(cors());

app.use(logger);
/**
 * Register API documentation middleware
 */
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/**
 * Port number for express app
 */
// const port = 3000;

/**
 * Excuse interface
 */
interface Excuse {
  id: number;
  description: string;
  createdBy: number;
  category: number;
  visibility: string;
}

/**
 * API test endpoint
 */
app.get('/ping', (req: Request, res: Response) => {
  res.status(responseCodes.ok).json({
    message: 'Alive',
  });
});

/**
 * *********************** Users ******************
 */
app.get('/users', usersController.getAllUsers);
app.get('/users/:id', usersController.getUserById);
app.delete('/users/:id', usersController.removeUser);
app.post('/users', usersController.createUser);
app.patch('/users/:id', usersController.updateUser);

/**
 * *********************** Categories ******************
 * Get all categories
 */
app.get('/categories', (req: Request, res: Response) => {
  const { categories } = db;
  return res.status(responseCodes.ok).json({
    categories,
  });
});

/**
 * Get category by id
 */
app.get('/categories/:id', (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  if (!id) {
    return res.status(responseCodes.badRequest).json({
      error: 'No valid id provided',
    });
  }
  const category = db.categories.find((element) => element.id === id);
  if (!category) {
    return res.status(responseCodes.badRequest).json({
      error: `No category found with id: ${id}`,
    });
  }
  return res.status(responseCodes.ok).json({
    category,
  });
});

/**
 * Remove category by id
 */
app.delete('/categories/:id', (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  if (!id) {
    return res.status(responseCodes.badRequest).json({
      error: 'No valid id provided',
    });
  }
  const index = db.categories.findIndex((element) => element.id === id);
  if (index < 0) {
    return res.status(responseCodes.badRequest).json({
      message: `Category not found with id: ${id}`,
    });
  }
  db.categories.splice(index, 1);
  return res.status(responseCodes.noContent).json({});
});

/**
 * Create category
 */
app.post('/categories', (req: Request, res: Response) => {
  const { name, createdBy } = req.body;
  if (!name) {
    return res.status(responseCodes.badRequest).json({
      error: 'Category name is required',
    });
  }
  if (!createdBy) {
    return res.status(responseCodes.badRequest).json({
      error: 'Created by id is required',
    });
  }
  const id = db.users.length + 1;
  db.categories.push({
    id,
    name,
    createdBy,
  });
  return res.status(responseCodes.created).json({
    id,
  });
});

/**
 * Update category
 */
app.patch('/categories/:id', (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  const { name } = req.body;
  if (!name) {
    return res.status(responseCodes.badRequest).json({
      error: 'Nothing to update',
    });
  }
  const index = db.categories.findIndex((element) => element.id === id);
  if (index < 0) {
    return res.status(responseCodes.badRequest).json({
      error: `No category found with id: ${id}`,
    });
  }
  db.categories[index].name = name;
  return res.status(responseCodes.noContent).json({});
});

/**
 * *********************** Excuses ******************
 * Get excuses
 */
app.get('/excuses', (req: Request, res: Response) => {
  const { category } = req.query;
  const { excuses } = db;
  if (!category) {
    return res.status(responseCodes.ok).json({
      excuses,
    });
  }
  const foundCategory = db.categories.find((element) => element.name === category);
  if (!foundCategory) {
    return res.status(responseCodes.badRequest).json({
      error: `No ${category} found`,
    });
  }
  const excusesInCategory = excuses.filter((element) => element.category === foundCategory.id);
  if (!excusesInCategory || excusesInCategory.length < 1) {
    return res.status(responseCodes.badRequest).json({
      error: `No excuses found in ${category}`,
    });
  }
  return res.status(responseCodes.ok).json({
    excuses: excusesInCategory,
  });
});
/**
 * Get random excuse
 */
app.get('/excuses/random', (req: Request, res: Response) => {
  const random = Math.round(Math.random() * (db.excuses.length - 1));
  const excuse: Excuse = db.excuses[random];
  return res.status(responseCodes.ok).json({
    excuse,
  });
});

/**
 * Get excuse by id
 */
app.get('/excuses/:id', (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  if (!id) {
    return res.status(responseCodes.badRequest).json({
      error: 'No valid id provided',
    });
  }
  const excuse = db.excuses.find((element) => element.id === id);
  if (!excuse) {
    return res.status(responseCodes.badRequest).json({
      error: `No excuse found with id: ${id}`,
    });
  }
  return res.status(responseCodes.ok).json({
    excuse,
  });
});

/**
 * Remove excuse by id
 */
app.delete('/excuses/:id', (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  if (!id) {
    return res.status(responseCodes.badRequest).json({
      error: 'No valid id provided',
    });
  }
  const index = db.excuses.findIndex((element) => element.id === id);
  if (index < 0) {
    return res.status(responseCodes.badRequest).json({
      message: `Excuse not found with id: ${id}`,
    });
  }
  db.excuses.splice(index, 1);
  return res.status(responseCodes.noContent).json({});
});

/**
 * Create excuse
 */
app.post('/excuses', (req: Request, res: Response) => {
  const {
    description,
    createdBy,
    category,
    visibility,
  } = req.body;

  if (!description) {
    return res.status(responseCodes.badRequest).json({
      error: 'Excuse description is required',
    });
  }
  if (!createdBy) {
    return res.status(responseCodes.badRequest).json({
      error: 'Created by id is required',
    });
  }
  if (!category) {
    return res.status(responseCodes.badRequest).json({
      error: 'Category id is required',
    });
  }
  if (!visibility) {
    return res.status(responseCodes.badRequest).json({
      error: 'Visibility is required',
    });
  }
  const id = db.excuses.length + 1;
  const excuse: Excuse = {
    id,
    description,
    createdBy,
    category,
    visibility,
  };
  db.excuses.push(excuse);
  return res.status(responseCodes.created).json({
    id,
  });
});

/**
 * Update excuse
 */
app.patch('/excuses/:id', (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  const { description, category, visibility } = req.body;
  if (!description && !category && !visibility) {
    return res.status(responseCodes.badRequest).json({
      error: 'Nothing to update',
    });
  }
  const index = db.excuses.findIndex((element) => element.id === id);
  if (index < 0) {
    return res.status(responseCodes.badRequest).json({
      error: `No excuse found with id: ${id}`,
    });
  }
  if (description) {
    db.excuses[index].description = description;
  }
  if (category) {
    db.excuses[index].category = category;
  }
  if (visibility) {
    db.excuses[index].visibility = visibility;
  }

  return res.status(responseCodes.noContent).json({});
});

/**
 * Start listening
 */
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port: ${port}`);
});
