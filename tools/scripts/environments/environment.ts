import * as fs from 'fs';
// import * as path from 'path';
import * as colors from 'colors';
import * as dotenv from 'dotenv';
import * as dotenvParseVariables from 'dotenv-parse-variables';

let env = dotenv.config({});
if (env.error) throw env.error;
env = dotenvParseVariables(env.parsed);

const targetPath =
  './libs/shared/environments/src/lib/environments/environment.ts';

// type: 'development',
// production: false,
// isMockEnabled: ${env.IS_MOCK_ENABLED},
// authTokenKey: '${process.env.AUTH_TOKEN_KEY}',
// firebaseConfig: {
//   apiKey: '${process.env.DBDEV_API_KEY}',
//   authDomain: '${process.env.DBDEV_AUTH_DOMAIN}',
//   databaseURL: '${process.env.DBDEV_DATABASE_URL}',
//   projectId: '${process.env.DBDEV_PROJECT_ID}',
//   storageBucket: '${process.env.DBDEV_STORAGE_BUCKET}',
//   messagingSenderId: '${process.env.DBDEV_MESSAGING_SENDER_ID}',
//   appId: '${process.env.DBDEV_APP_ID}'
// },
// firebaseTestingConfig: {
//   apiKey: '${process.env.DBTEST_API_KEY}',
//   authDomain: '${process.env.DBTEST_AUTH_DOMAIN}',
//   databaseURL: '${process.env.DBTEST_DATABASE_URL}',
//   projectId: '${process.env.DBTEST_PROJECT_ID}',
//   storageBucket: '${process.env.DBTEST_STORAGE_BUCKET}',
//   messagingSenderId: '${process.env.DBTEST_MESSAGING_SENDER_ID}',
//   appId: '${process.env.DBTEST_APP_ID}'
// },

// `environment.ts` file structure
const envConfigFile = `export const environment = {
  environmentType: 'development',
  production: false,
  apiPort: ${process.env.DEVELOPMENT_API_PORT},
  mongoConfig: {
    dbName: '${process.env.DEVELOPMENT_MONGO_DB_NAME}',
    dbUser: '${process.env.DEVELOPMENT_MONGO_DB_USER}',
    dbPassword: '${process.env.DEVELOPMENT_MONGO_DB_PWD}',
    dbConnectionStr: 'mongodb+srv://${process.env.DEVELOPMENT_MONGO_DB_USER}:${process.env.DEVELOPMENT_MONGO_DB_PWD}@cluster0.dfmz5.mongodb.net/${process.env.DEVELOPMENT_MONGO_DB_NAME}?retryWrites=true&w=majority',
  }
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

fs.writeFile(targetPath, envConfigFile, function (err) {
  if (err) {
    throw console.error(err);
  } else {
    console.log(
      colors.magenta(
        `environment.ts file generated correctly at ${targetPath} \n`
      )
    );
  }
});
