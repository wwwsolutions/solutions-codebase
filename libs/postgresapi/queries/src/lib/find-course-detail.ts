import { CourseModel, LessonModel } from '@codebase/postgresapi/models';

export function findCourseDetail(id: number) {
  return CourseModel.findByPk(id, {
    include: [
      {
        model: LessonModel,
      },
    ],
  });
}
