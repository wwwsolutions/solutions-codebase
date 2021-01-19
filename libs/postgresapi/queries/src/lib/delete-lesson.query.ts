/* eslint-disable @typescript-eslint/no-explicit-any */
import { LessonModel } from '@codebase/postgresapi/models';

export function deleteLesson(id: number) {
  return LessonModel.destroy({
    where: { id },
  });
}
