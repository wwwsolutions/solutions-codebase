import { Sequelize, DataTypes } from 'sequelize';

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
