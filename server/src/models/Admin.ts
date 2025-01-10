import {
  Model,
  DataTypes,
  Optional,
  Sequelize,
  ForeignKey,
} from "sequelize";
import { User } from "./User";
import sequelize from "../config/orm";

interface AdminAttributes {
  id: number;
  firstName: string;
  surname: string;
  userId: number; // Assuming this references another model's ID
}

type AdminCreationAttributes = Optional<AdminAttributes, "id">;

export class Admin extends Model<AdminAttributes, AdminCreationAttributes>
  implements AdminAttributes {
  public id!: number;
  public firstName!: string;
  public surname!: string;
  public userId!: ForeignKey<User['id']>; // Correctly typed as ForeignKey<number>
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Optionally, define associations here
  static associate(models: any) {
    // Define associations, e.g., Admin.belongsTo(models.SuperAdmin);
  }
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
    { sequelize, tableName: "superadmins", timestamps: true }
  );

  
