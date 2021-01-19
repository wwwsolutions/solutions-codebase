import {
  CourseModel,
  CourseSummary,
  createCourseSummaries,
} from '@codebase/postgresapi/models';

// https://www.zleptnig.com/blog/the-power-of-bluebirds-promise-map
// https://itnext.io/bluebirds-bad-practice-docs-f9cc94b1af9
// https://codesandbox.io/s/zrx80449jx?file=/lib/models/Actor.ts:351-356
import Bluebird from 'bluebird';

export function findAllCourses(): Bluebird<CourseSummary[]> {
  return CourseModel.findAll({ order: [`seqNo`] }).then(
    createCourseSummaries
  ) as Bluebird<CourseSummary[]>;
}
