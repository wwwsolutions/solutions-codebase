import app from './app/app';
import { production } from '@codebase/shared/environments';

console.log(production);

// SERVER
const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
