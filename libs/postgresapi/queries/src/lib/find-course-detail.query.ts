import { CourseModel, LessonModel } from '@codebase/postgresapi/models';

export function findCourseDetail(courseId: number) {
  return CourseModel.findByPk(courseId, {
    include: [{ model: LessonModel }], // DEFINE JOINT
  });
}
