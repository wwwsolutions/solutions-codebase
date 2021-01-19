import { Sequelize, DataTypes } from 'sequelize';

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

export function initLessonModel(sequelize: Sequelize) {
  return sequelize.define('Lesson', {
    url: DataTypes.STRING,
    description: DataTypes.STRING,
    duration: DataTypes.STRING,
    seqNo: DataTypes.INTEGER,
    courseId: DataTypes.INTEGER,
    pro: DataTypes.BOOLEAN,
    tags: DataTypes.STRING,
    gitHubUrl: DataTypes.STRING,
  });
}
