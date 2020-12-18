import { Sequelize } from 'sequelize';
import { environment } from '@codebase/shared/environments';

import { initCourseModel } from './init-course-model';

const connectionString: string = environment.postgreConfig.dbLocalConnectionStr;
const options = { benchmark: true, logging: console.log };
const sequelize: Sequelize = new Sequelize(connectionString, options);

// MODELS
export const CourseModel = initCourseModel(sequelize);
