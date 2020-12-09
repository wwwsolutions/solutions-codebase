// REFERENCES
// https://medium.com/@ferie/how-to-pass-environment-variables-at-building-time-in-an-angular-application-using-env-files-4ae1a80383c
// https://medium.com/the-node-js-collection/making-your-node-js-work-everywhere-with-environment-variables-2da8cdf6e786
// https://www.npmjs.com/package/dotenv#path

// import { writeFile } from 'fs';
// require('dotenv').config({});

const fs = require('fs');
const colors = require('colors');
const path = require('path');

const dotenv = require('dotenv');
const dotenvParseVariables = require('dotenv-parse-variables');

let env = dotenv.config({});
if (env.error) throw env.error;
env = dotenvParseVariables(env.parsed);

// Load node modules
// require('dotenv').config({ path: `/environment/.env.${process.env.NODE_ENV}` });
// require('dotenv').load();

// Configure Angular `environment.ts` file path
// const targetPath = './src/environments/environment.ts';
const targetPath =
  './libs/shared/environments/src/lib/environments/environment.ts';

// `environment.ts` file structure
const envConfigFile = `export const environment = {
  production: JSON.parse('${env.PRODUCTION}'),
  isMockEnabled: JSON.parse('${env.IS_MOCK_ENABLED}'),
  authTokenKey: '${process.env.AUTH_TOKEN_KEY}',
  firebaseConfig: {
    apiKey: '${process.env.DBDEV_API_KEY}',
    authDomain: '${process.env.DBDEV_AUTH_DOMAIN}',
    databaseURL: '${process.env.DBDEV_DATABASE_URL}',
    projectId: '${process.env.DBDEV_PROJECT_ID}',
    storageBucket: '${process.env.DBDEV_STORAGE_BUCKET}',
    messagingSenderId: '${process.env.DBDEV_MESSAGING_SENDER_ID}',
    appId: '${process.env.DBDEV_APP_ID}'
  },
  firebaseTestingConfig: {
    apiKey: '${process.env.DBTEST_API_KEY}',
    authDomain: '${process.env.DBTEST_AUTH_DOMAIN}',
    databaseURL: '${process.env.DBTEST_DATABASE_URL}',
    projectId: '${process.env.DBTEST_PROJECT_ID}',
    storageBucket: '${process.env.DBTEST_STORAGE_BUCKET}',
    messagingSenderId: '${process.env.DBTEST_MESSAGING_SENDER_ID}',
    appId: '${process.env.DBTEST_APP_ID}'
  },

};
`;

if (JSON.parse(env.ENVIRONMENT_LOGGING_ENABLED)) {
  console.log(env);
  console.log(
    colors.magenta(
      'The file `environment.ts` will be written with the following content: \n'
    )
  );
  console.log(colors.grey(envConfigFile));
}

fs.writeFile(targetPath, envConfigFile, function(err) {
  if (err) {
    throw console.error(err);
  } else {
    console.log(
      colors.magenta(
        `Angular environment.ts file generated correctly at ${targetPath} \n`
      )
    );
  }
});
