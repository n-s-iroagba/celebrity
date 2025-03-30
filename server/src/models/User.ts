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
  emailVerificationCode: string|null;
  verificationToken: string|null;
  passwordResetToken: string|null;
  whatsAppNumber:string;
  whatsAppVerificationCode:string |null;
  isWhatsAppVerified:boolean;
  isEmailVerified:boolean;
}

type UserCreationAttributes = Optional<UserAttributes, "id">;

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {

  public verificationToken!: string | null;
  public passwordResetToken!: string | null;
  public role!: Role;
  public id!: number;
  public email!: string;
  public password!: string;
  public emailVerificationCode!: string|null;
  public isWhatsAppVerified!: boolean;
  public isEmailVerified!: boolean;
  public whatsAppNumber!: string;
  public whatsAppVerificationCode!: string | null;

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

        verificationToken: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        emailVerificationCode: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        whatsAppVerificationCode: {
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
        whatsAppNumber: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        isWhatsAppVerified: {
          type: DataTypes.BOOLEAN,
        },
        isEmailVerified: {
          type: DataTypes.BOOLEAN,
        }
      },
      {
        sequelize,
        tableName: "users",
        timestamps: true,
      }
    );
  
