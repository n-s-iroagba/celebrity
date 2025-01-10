
import {
  Model,
  DataTypes,
  Optional,
  ForeignKey,
} from "sequelize";
import sequelize from "../config/orm";
import { Admin } from "./Admin";
import { User } from "./User";


interface SuperAdminAttributes {
  id: number;
  firstName: string;
  surname: string;
  adminId: number; 
  userId: number; 
}

type SuperAdminCreationAttributes = Optional<SuperAdminAttributes, "id">;

export class SuperAdmin extends Model<SuperAdminAttributes, SuperAdminCreationAttributes>
  implements SuperAdminAttributes {
  public id!: number;
  public firstName!: string;
  public surname!: string;
  public adminId!: ForeignKey<Admin['id']>
  public userId!: ForeignKey<User['id']>
  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

  SuperAdmin.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      adminId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      firstName:  {
        type: DataTypes.STRING,
        allowNull: false,
      },
      surname:   {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { sequelize, tableName: "superadmins", timestamps: true }
  );