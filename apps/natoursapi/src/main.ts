import app from './app/app';
import mongoose from 'mongoose';

import { environment } from '@codebase/shared/environments';

// GLOBAL PLUGIN (setRunValidators fix)
function setRunValidators() {
  this.setOptions({ runValidators: true });
}

mongoose.plugin((schema) => {
  schema.pre('findOneAndUpdate', setRunValidators);
  schema.pre('updateMany', setRunValidators);
  schema.pre('updateOne', setRunValidators);
  schema.pre('update', setRunValidators);
});

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
  console.log(`Listening at http://localhost:${port}`);
});
server.on('error', console.error);
