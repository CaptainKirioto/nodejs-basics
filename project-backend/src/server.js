import express from 'express';
import cors from 'cors';
import { env } from './utils/env.js';
import contactsRouter from './routers/contacts.js';
import authRouter from './routers/auth.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { logger } from './middlewares/logger.js';

export const startServer = () => {
  // ---- Creating Web-Server ---- //

  const app = express();

  // app.use(logger);

  // ---- Creating Middleware ---- //

  app.use(cors());
  app.use(express.json());

  // Якщо прийде будь-який запит, що починається з /contacts, шукай обробник цього запиту у об'єкті contactsRouter
  app.use('/auth', authRouter);
  app.use('/contacts', contactsRouter);

  app.use(notFoundHandler); // when address is not found, should be placed right after routes

  app.use(errorHandler); // when error occured

  const port = Number(env('PORT', 300));

  app.listen(port, () => console.log(`Server running on ${port} PORT`));
};
