import { CourseSummary } from './course-summary.interface';
import { Lesson } from './lesson.interface';

export interface CourseDetail extends CourseSummary {
  longDescription: string;
  comingSoon?: boolean;
  isNew?: boolean;
  isOngoing?: boolean;
  lessons: Lesson[];
}
