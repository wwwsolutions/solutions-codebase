import * as express from 'express';

// FAKE DATA
import { tours } from './dev-data/data/tours-simple';

const app = express();

app.get('/api/v1/tours', (req, res) => {
  // ENVELOPE DATA
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: { tours },
  });
});

// app.get('/api', (req, res) => {
//   res.status(200).send({ message: 'Welcome to natoursapi! GET' });
// });

// app.post('/api', (req, res) => {
//   res.status(200).send({ message: 'Welcome to natoursapi! POST' });
// });

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
