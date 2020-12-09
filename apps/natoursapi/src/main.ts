import app from './app/app';
import dotenv from 'dotenv';
import dotenvParseVariables from 'dotenv-parse-variables';

// ENVIRONMENT VARIABLES
let env = dotenv.config({});
if (env.error) throw env.error;
env = dotenvParseVariables(env.parsed);

console.log(env);

// SERVER
const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
