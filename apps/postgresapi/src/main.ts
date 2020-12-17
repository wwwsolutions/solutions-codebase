import { environment } from '@codebase/shared/environments';

import app from './app/app';

// const db: string = environment.postgreConfig.dbCloudConnectionStr;

app.get('/api', (req, res) => {
  res.send({ message: `Welcome to Postgresapi!` });
});

const port = environment.apiPort || 5000;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
