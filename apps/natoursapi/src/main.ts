import app from './app/app';
import mongoose from 'mongoose';
import { plugin, set, connect } from 'mongoose';

import { environment } from '@codebase/shared/environments';

// HANDLE GLOBAL EXCEPTIONS
process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log('UNCAUGHT EXCEPTION! Shutting down...');
  process.exit(1);
});

// https://stackoverflow.com/questions/50011091/how-to-create-item-if-not-exists-and-return-an-error-if-exists
set('debug', true);
mongoose.Promise = global.Promise;

// GLOBAL PLUGIN (setRunValidators fix)
function setRunValidators() {
  this.setOptions({ runValidators: true });
}

plugin((schema) => {
  schema.pre('findOneAndUpdate', setRunValidators);
  schema.pre('updateMany', setRunValidators);
  schema.pre('updateOne', setRunValidators);
  schema.pre('update', setRunValidators);
});

const db: string = environment.mongoConfig.dbCloudConnectionStr;

connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
}).then(() => {
  console.log('Database connection successful!');
});

// SERVER
const port = environment.apiPort || 5000;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
// server.on('error', console.error);

process.on('unhandledRejection', (err) => {
  console.log(err);
  console.log('UNHANDLED REJECTION! Shutting down...');
  server.close(() => {
    process.exit(1);
  });
});
