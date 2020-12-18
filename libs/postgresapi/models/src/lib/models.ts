import { Sequelize } from 'sequelize';
import { environment } from '@codebase/shared/environments';

import { initCourseModel } from './init-course-model';

const options = { benchmark: true, logging: console.log };
const uri: string = environment.postgreConfig.dbLocalConnectionStr;
const sequelize: Sequelize = new Sequelize(uri, options);

// MODELS
export const CourseModel = initCourseModel(sequelize);
