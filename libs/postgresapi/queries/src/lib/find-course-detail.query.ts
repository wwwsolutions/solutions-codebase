import * as Bluebird from 'bluebird';

import { CourseModel, LessonModel } from '@codebase/postgresapi/models';
import {
  CourseDetail,
  createCourseDetail,
} from '@codebase/shared/data-access-models';

export function findCourseDetail(courseId: number): Bluebird<CourseDetail> {
  return CourseModel.findByPk(courseId, {
    include: [{ model: LessonModel }], // DEFINE JOINT
  }).then(createCourseDetail) as Bluebird<CourseDetail>;
}
