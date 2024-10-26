import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
// import dotenv from 'dotenv';
// dotenv.config();
// import 'dotenv/config';
// const port = Number(process.env.PORT);
// console.log(process.env.PORT);

import { env } from './utils/env.js';
import * as contactServices from './services/contacts.js';

export const startServer = () => {
  const app = express();
  app.use(cors());
  const logger = pino({
    transport: {
      target: 'pino-pretty',
    },
  });
  //   app.use(logger);

  app.get('/contacts', async (req, res) => {
    const data = await contactServices.getContacts();

    res.json({
      status: 200,
      message: 'Contacts successfully found',
      data,
    });
  });

  app.get('/contacts/:id', async (req, res) => {
    const { id } = req.params;
    const data = await contactServices.getContactById(id);

    if (!data) {
      return res.status(404).json({
        message: `Contact with id=${id} not found`,
      });
    }

    res.json({
      status: 200,
      message: 'Contact successfully found',
      data,
    });
  });

  app.use((req, res) => {
    res.status(404).json({
      message: `${req.url} not found`,
    });
  });

  app.use((error, req, res, next) => {
    res.status(505).json({
      message: error.message,
    });
  });

  const port = Number(env('PORT', 300));

  app.listen(port, () => console.log(`Server running on ${port} PORT`));
};
