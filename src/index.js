import express from 'express';
import contacts from './db/contacts.js';
import cors from 'cors';
import pino from 'pino-http';

const app = express();

// Exampe 1

// app.get('/', (request, response) => {
//   response.send('<h1>Home Page</h1>');
// });

// app.get('/contacts', (request, response) => {
//   console.log(request.method);
//   console.log(request.url);
//   response.send('<h1>Contacts Page</h1>');
// });

// app.listen(3000, () =>
//   console.log('Web-server successfully running on 3000 port'),
// );

// Example 2

// app.set('json spaces', 4);
// app.get('/contacts', (_, res) => {
//   res.json(contacts); // it's better then res.send while it can return null and it includes app.set settings
//   // res.send(contacts);
// });

// app.listen(3000, () =>
//   console.log('Web-server successfully running on 3000 port'),
// );

// Example 3

app.use(cors());
const logger = pino({
  transport: {
    target: 'pino-pretty',
  },
});
// app.use(logger);

// const corsMiddleware = cors();
// app.use(corsMiddleware);

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader(
//     'Access-Control-Allow-Methods',
//     'GET, POST, OPTIONS, PUT, PATCH, DELETE',
//   );
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'X-Requested-With,content-type',
//   );
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   next();
// });

// app.use((req, res, next) => {
//   console.log('First middleware');
//   next();
// });

// app.use((req, res, next) => {
//   console.log('Second Middleware');
//   next();
// });

app.get('/products', (req, res) => {
  res.json([]);
});

app.get('/contacts', (req, res) => {
  res.json(contacts);
});

app.use((req, res) => {
  res.status(404).json({
    message: `${req.url} not found`,
  });
});

app.listen(3000, () =>
  console.log('Web-server successfully running on 3000 port'),
);
