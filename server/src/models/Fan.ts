import { Sequelize, DataTypes, ForeignKey, Model, Optional, NonAttribute } from "sequelize";
import { Admin } from "./Admin";
import { SocialMediaType } from "../enums/SocialMediaType";
import { User } from "./User";
import sequelize from "../config/orm";

interface FanAttributes {
  id: number;
  firstName: string;
  surname: string;
  password: string;
  socialMediaHandle: string;
  profilePicture:string|null;
  socialMediaType: SocialMediaType;
  phoneNumber: string;
  country: string;
  dateOfBirth: Date;
  resetPasswordToken: string|null;
  verificationToken: string |null;
  adminId: ForeignKey<Admin["id"]>;
  userId: ForeignKey <User['id']>
//   user: NonAttribute<User>
//   admin : NonAttribute<Admin>
}

export type FanCreationAttributes = Optional<FanAttributes, "id" | "resetPasswordToken" | "verificationToken">;

export class Fan extends Model<FanAttributes, FanCreationAttributes> implements FanAttributes {
  public profilePicture: string | null=null;
  public userId!: number
  public id!: number;
  public firstName!: string;
  public surname!: string;
  public password!: string;
  public socialMediaHandle!: string;
  public socialMediaType!: SocialMediaType;
  public phoneNumber!: string;
  public country!: string;
  public dateOfBirth!: Date;
  public resetPasswordToken: string|null = null;
  public verificationToken: string|null = null;
  public adminId!: number;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(models: { Admin: typeof Admin }) {
    Fan.belongsTo(models.Admin, { foreignKey: "adminId", as: "admin" });
  }
}

  Fan.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      profilePicture: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      surname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      socialMediaHandle: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      socialMediaType: {
        type: DataTypes.ENUM(...Object.values(SocialMediaType)),
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dateOfBirth: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      resetPasswordToken: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      verificationToken: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      adminId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "Fans",
    }
  );

