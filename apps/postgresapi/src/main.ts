import app from './app/app';
import { environment } from '@codebase/shared/environments';

app.get('/api', (req, res) => {
  res.send({ message: `Welcome to Postgresapi!` });
});

const port = environment.apiPort || 5000;

const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});

server.on('error', console.error);
