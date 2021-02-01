export interface Lesson {
  readonly id: number;
  readonly url: string;
  description: string;
  duration: string;
  seqNo: number;
  pro: number;
  tags?: string;
  courseId: string;
}
