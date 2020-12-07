// https://levelup.gitconnected.com/project-structure-and-building-routes-of-restful-api-with-node-js-f3a8b53d94e7

import * as express from 'express';

const app = express();

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to todomongoapi!' });
});

const host = 'http://localhost';

const port = process.env.port || 8888;

export const server = app.listen(port, () => {
  console.log(`Listening at ${host}:${port}`);
});

server.on('error', console.error);
