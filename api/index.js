import express from 'express';
import helmet from 'helmet';
import pino from 'pino-http';
import routes from './routes';
import { NotFoundError } from './utils';

const isProd = process.env.NODE_ENV === 'production';

if (!global.fetch) {
  global.fetch = require('node-fetch');
}

const app = express();

// Global middleware
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(pino());

// Routes
app.use(routes);

// 404 error handling
app.use(() => {
  throw new NotFoundError('Not found');
});

// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  let status;
  switch (error.name) {
    case 'ValidationError':
      status = 400;
      break;
    case 'AuthorizationError':
      status = 401;
      break;
    case 'ForbiddenError':
      status = 403;
      break;
    case 'NotFoundError':
      status = 404;
      break;
    case 'ConflictError':
      status = 409;
      break;
    default:
      status = error.status || 500;
  }

  // The Error contstructor is treated differently than a normal object
  const clientError = {
    name: error.name,
    message: error.message,
    status,
  };

  // For Yup validation errors
  if (error.errors && Array.isArray(error.errors)) {
    clientError.message = error.errors.join(', ');
  }

  if (!isProd) {
    if (process.env.NODE_ENV !== 'test') {
      console.log(error);
    }
    clientError.stack = error.stack;
  }

  res.status(status).json(clientError);
});

// Export the server middleware
export default {
  path: '/api',
  handler: app,
};
