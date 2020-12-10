import app from './app/app';
import mongoose from 'mongoose';

import { environment } from '@codebase/shared/environments';

import { Tour } from '@codebase/natoursapi/models';

const db: string = environment.mongoConfig.dbCloudConnectionStr;

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('Database connection successful!');
  });

// SERVER
const port = environment.apiPort || 5000;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
