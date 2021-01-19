/* eslint-disable @typescript-eslint/no-explicit-any */
import { Sequelize, DataTypes } from 'sequelize';
import { Lesson } from './init-lesson-model';

export interface CourseDetail extends CourseSummary {
  longDescription: string;
  comingSoon?: boolean;
  isNew?: boolean;
  isOngoing?: boolean;
  lessons: Lesson[];
}
export interface CourseSummary {
  readonly id: number;
  readonly url: string;
  description: string;
  iconUrl: string;
  courseListIcon: string;
  seqNo: number;
}

export function createCourseSummary({
  id,
  url,
  description,
  iconUrl,
  courseListIcon,
  seqNo,
}: any): CourseSummary {
  return { id, url, description, iconUrl, courseListIcon, seqNo };
}

export function createCourseSummaries(data: any[]): CourseSummary[] {
  return data.map(createCourseSummary);
}

export function initCourseModel(sequelize: Sequelize) {
  return sequelize.define('Course', {
    description: DataTypes.STRING,
    url: DataTypes.STRING,
    longDescription: DataTypes.TEXT,
    iconUrl: DataTypes.STRING,
    courseListIcon: DataTypes.STRING,
    seqNo: DataTypes.INTEGER,
    comingSoon: DataTypes.BOOLEAN,
    isNew: DataTypes.BOOLEAN,
    isOngoing: DataTypes.BOOLEAN,
  });
}
