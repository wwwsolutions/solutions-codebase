import { Sequelize } from 'sequelize';

import { environment } from '@codebase/shared/environments';
import { initCourseModel } from './init-course-model';
import { initLessonModel } from './init-lesson-model';

const options = { benchmark: true, logging: console.log };
const uri: string = environment.postgreConfig.dbLocalConnectionStr;
const sequelize: Sequelize = new Sequelize(uri, options);

// MODELS
export const CourseModel = initCourseModel(sequelize);
export const LessonModel = initLessonModel(sequelize);

// RELATIONSHIPS

// BIDIRECTIONAL RELATIONSHIP DEFINITION [CourseModel <> LessonModel]
CourseModel.hasMany(LessonModel, { foreignKey: 'courseId' });
LessonModel.belongsTo(CourseModel, { foreignKey: 'courseId' });
