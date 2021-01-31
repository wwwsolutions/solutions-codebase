/* eslint-disable @typescript-eslint/no-explicit-any */
import { CourseSummary } from './course-summary.interface';
import { Lesson } from './lesson.interface';

export interface CourseDetail extends CourseSummary {
  longDescription: string;
  comingSoon?: boolean;
  isNew?: boolean;
  isOngoing?: boolean;
  lessons: Lesson[];
}

export interface Data<T> {
  status: string;
  payload: T;
}

function createLessonFromDbModel({
  id,
  url,
  description,
  duration,
  seqNo,
  pro,
  tags,
  courseId,
}) {
  return {
    id,
    url,
    description,
    duration,
    seqNo,
    pro,
    tags,
    courseId,
  };
}

export function createCourseDetail({
  id,
  url,
  description,
  iconUrl,
  courseListIcon,
  seqNo,
  longDescription,
  comingSoon,
  isNew,
  isOngoing,
  Lessons,
}: any): CourseDetail {
  return {
    id,
    url,
    description,
    iconUrl,
    courseListIcon,
    seqNo,
    longDescription,
    comingSoon,
    isNew,
    isOngoing,
    lessons: Lessons.map(createLessonFromDbModel),
  };
}
