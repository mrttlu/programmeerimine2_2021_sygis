/**
 * Import express framework
 */
import express, { Application } from 'express';
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

/**
 * Import controllers
 */
import usersController from './components/users/controller';
import categoriesController from './components/categories/controller';
import excusesController from './components/excuses/controller';
import authController from './components/auth/controller';
import ping from './components/ping/controller';

/**
 * Import middlewares
 */
import excusesMiddlewares from './components/excuses/middlewares';
import logger from './components/general/loggerMiddleware';
import isLoggedIn from './components/auth/isLoggedInMiddleware';
import isAdmin from './components/auth/isAdminMiddleware';

import { port } from './components/general/settings';

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
 * API test endpoint
 */
app.get('/ping', ping);

/**
 * *********************** Endpoints without loggedIn middleware ******************
 */
app.post('/login', authController.login);
app.post('/users', usersController.createUser);

app.use(isLoggedIn);

/**
 * *********************** Users ******************
 */
app.get('/users', isAdmin, usersController.getAllUsers);
app.get('/users/:id', usersController.getUserById);
app.delete('/users/:id', usersController.removeUser);
app.patch('/users/:id', usersController.updateUser);

/**
 * *********************** Categories ******************
 */
app.get('/categories', categoriesController.getAllCategories);
app.get('/categories/:id', categoriesController.getCategoryById);
app.delete('/categories/:id', categoriesController.deleteCategory);
app.post('/categories', categoriesController.createCategory);
app.patch('/categories/:id', categoriesController.updateCategory);

/**
 * *********************** Excuses ******************
 */
app.get('/excuses', excusesController.getAllExcuses);
app.get('/excuses/random', excusesController.getRandomExcuse);
app.get('/excuses/:id', excusesController.getExcuseById);
app.get('/excuses/category/:id', excusesController.getExcusesByCategory);
app.delete('/excuses/:id', excusesController.deleteExcuse);
app.post('/excuses', excusesMiddlewares.validateCreateExcuse, excusesController.createExcuse);
app.patch('/excuses/:id', excusesController.updateExcuse);

/**
 * Start listening
 */
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port: ${port}`);
});
