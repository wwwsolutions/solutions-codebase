export interface Lesson {
  courseId: number;
  readonly url: string;
  description: string;
  duration: string;
  seqNo: number;
  pro: number;
  tags?: string;
}
