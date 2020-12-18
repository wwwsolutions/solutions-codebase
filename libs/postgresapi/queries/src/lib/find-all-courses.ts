import { CourseModel } from '@codebase/postgresapi/models';

export function findAllCourses() {
  return CourseModel.findAll({ order: ['seqNo'] });
}
