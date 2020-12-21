export interface Lesson {
  readonly id: number;
  readonly url: string;
  courseId: number;
  description: string;
  duration: string;
  seqNo: number;
  pro: number;
  tags?: string;
}
