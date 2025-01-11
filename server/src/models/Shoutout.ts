import { Model, DataTypes, ForeignKey, Optional } from "sequelize";
import sequelize from "../config/orm";
import { Fan } from "./Fan";
import { Celebrity } from "./Celebrity";

interface ShoutoutAttributes {
  id: number;
  fanId: ForeignKey<Fan['id']>;
  celebrityId: ForeignKey<Celebrity['id']>;
  message: string;
  status: 'pending' | 'approved' | 'rejected';
}

type ShoutoutCreationAttributes = Optional<ShoutoutAttributes, 'id'>;

export class Shoutout extends Model<ShoutoutAttributes, ShoutoutCreationAttributes> {
  public id!: number;
  public fanId!: number;
  public celebrityId!: number;
  public message!: string;
  public status!: 'pending' | 'approved' | 'rejected';
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Shoutout.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fanId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'fans',
        key: 'id',
      },
    },
    celebrityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'celebrities',
        key: 'id',
      },
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'approved', 'rejected'),
      defaultValue: 'pending',
    },
  },
  {
    sequelize,
    tableName: 'shoutouts',
  }
);
