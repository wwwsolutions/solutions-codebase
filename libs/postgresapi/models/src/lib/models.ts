import { Sequelize } from 'sequelize';

import { environment } from '@codebase/shared/environments';
import { initCourseModel } from './course.model';
import { initLessonModel } from './lesson.model';

const options = { benchmark: true, logging: console.log };
const dbUrl: string = environment.postgreConfig.dbLocalConnectionStr;
const sequelize: Sequelize = new Sequelize(dbUrl, options);

// MODELS
export const CourseModel = initCourseModel(sequelize);
export const LessonModel = initLessonModel(sequelize);

// CourseModel.findAll().then((results) => console.log(JSON.stringify(results)));

// RELATIONSHIPS

// BIDIRECTIONAL RELATIONSHIP DEFINITION [one to many ]
CourseModel.hasMany(LessonModel, { foreignKey: 'courseId' });
LessonModel.belongsTo(CourseModel, { foreignKey: 'courseId' });
