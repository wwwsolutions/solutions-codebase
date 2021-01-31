/* eslint-disable @typescript-eslint/no-explicit-any */
import { Sequelize, DataTypes } from 'sequelize';
import { CourseSummary } from '@codebase/shared/data-access-models';

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
