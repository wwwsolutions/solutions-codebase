import { environment } from '@codebase/shared/environments';
import { onErrorResumeNext } from 'rxjs';

import {
  Sequelize,
  // Model,
  // ModelDefined,
  DataTypes,
  // HasManyGetAssociationsMixin,
  // HasManyAddAssociationMixin,
  // HasManyHasAssociationMixin,
  // Association,
  // HasManyCountAssociationsMixin,
  // HasManyCreateAssociationMixin,
  // Optional,
} from 'sequelize';

import app from './app/app';

const db: string = environment.postgreConfig.dbLocalConnectionStr;

const sequelize: Sequelize = new Sequelize(db);

const CourseModel = sequelize.define('Course', {
  description: DataTypes.STRING,
  url: DataTypes.STRING,
  longDescription: DataTypes.TEXT,
  iconUrl: DataTypes.STRING,
  courseListIcon: DataTypes.STRING,
  seqNo: DataTypes.INTEGER,
  comingSoon: DataTypes.BOOLEAN,
  isNew: DataTypes.BOOLEAN,
  isOngoing: DataTypes.BOOLEAN,
});

const query = CourseModel.findAll().then((results) =>
  console.log(JSON.stringify(results))
);
console.log(query);

app.get('/api', (req, res) => {
  res.send({ message: `Welcome to Postgresapi!` });
});

const port = environment.apiPort || 5000;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
