import { Model, DataTypes, Optional, ForeignKey } from "sequelize";
import { User } from "./User";
import sequelize from "../config/orm";

interface AdminAttributes {
  id: number;
  firstName: string;
  surname: string;
  userId: number;
}

type AdminCreationAttributes = Optional<AdminAttributes, "id">;

export class Admin
  extends Model<AdminAttributes, AdminCreationAttributes>
  implements AdminAttributes
{
  public id!: number;
  public firstName!: string;
  public surname!: string;
  public userId!: ForeignKey<User["id"]>; 
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Admin.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    surname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, tableName: "admins", timestamps: true }
);
