/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { LessonModel } from '@codebase/postgresapi/models';

export function deleteLesson(id: number) {
  return LessonModel.destroy({
    where: { id },
  });
}
