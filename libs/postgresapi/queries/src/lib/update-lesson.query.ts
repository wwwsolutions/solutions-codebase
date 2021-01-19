/* eslint-disable @typescript-eslint/no-explicit-any */
import { LessonModel } from '@codebase/postgresapi/models';

export function updateLesson(id: number, props: any) {
  return LessonModel.update(props, {
    where: { id },
  });
}
