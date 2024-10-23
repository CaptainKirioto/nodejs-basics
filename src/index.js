import express from 'express';

import contacts from './db/contacts.js';

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

app.get('/contacts', (_, res) => {
  res.send(contacts);
});

app.listen(3000, () =>
  console.log('Web-server successfully running on 3000 port'),
);
