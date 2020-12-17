/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import { environment } from '@codebase/shared/environments';

const app = express();

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to postgresapi!' });
});

const port = environment.apiPort || 5000;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
