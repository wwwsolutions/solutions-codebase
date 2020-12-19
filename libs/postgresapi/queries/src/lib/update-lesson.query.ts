/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { LessonModel } from '@codebase/postgresapi/models';

export function updateLesson(id: number, props: any) {
  return LessonModel.update(props, {
    where: { id },
  });
}
