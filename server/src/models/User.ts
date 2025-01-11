import {
  Model,
  Optional,
  DataTypes,
  Sequelize,
} from "sequelize";
import { Role } from "../enums/Role";
import sequelize from "../config/orm";

export interface UserAttributes {
  id: number;
  username: string;
  password: string;
  role:Role;
  verificationToken: string|null;
  passwordResetToken: string|null;
}

type UserCreationAttributes = Optional<UserAttributes, "id">;

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public verificationToken!: string | null;
  public passwordResetToken!: string | null;
  public role!: Role;
  public id!: number;
  public username!: string;
  public password!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

    User.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        verificationToken: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        passwordResetToken: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        role: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "users",
        timestamps: true,
      }
    );
  
