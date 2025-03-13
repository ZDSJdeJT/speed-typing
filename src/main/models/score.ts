import { CreationOptional, DataTypes, Model, Optional } from 'sequelize';

import sequelize from '~/src/main/database';

type ScoreAttributes = {
  id: number;
  errors: number;
  typed: number;
  createdAt?: Date;
};

type ScoreCreationAttributes = Optional<ScoreAttributes, 'id'>;

class Score extends Model<ScoreAttributes, ScoreCreationAttributes> {
  declare id: number;
  declare errors: number;
  declare typed: number;
  // timestamps!
  // createdAt can be undefined during creation
  declare createdAt: CreationOptional<Date>;
  // updatedAt can be undefined during creation
}

Score.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    errors: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    typed: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
  },
  {
    timestamps: true,
    updatedAt: false,
    sequelize,
    tableName: 'scores',
  },
);

export { type ScoreAttributes, type ScoreCreationAttributes, Score };
