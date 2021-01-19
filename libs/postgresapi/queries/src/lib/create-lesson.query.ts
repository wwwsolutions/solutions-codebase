/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { LessonModel } from '@codebase/postgresapi/models';

export function createLesson(props: any) {
  console.log('props=== ', props);
  return LessonModel.create(props);
}
