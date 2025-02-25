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
  email: string;
  password: string;
  role:Role;
  isVerified:boolean|null
  verificationCode: string|null;
  verificationToken: string|null;
  passwordResetToken: string|null;
}

type UserCreationAttributes = Optional<UserAttributes, "id">;

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public verificationToken!: string | null;
  public passwordResetToken!: string | null;
  public role!: Role;
  public id!: number;
  public email!: string;
  public password!: string;
  public verificationCode!: string|null;
  public isVerified!:boolean|null;
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
        email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        isVerified:{
        type:DataTypes.BOOLEAN,
        allowNull:true,
        defaultValue:null
        },
        verificationToken: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        verificationCode: {
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
  
