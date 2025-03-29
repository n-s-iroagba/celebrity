import {
  DataTypes,
  ForeignKey,
  Model,
  Optional,
  NonAttribute,
} from "sequelize";
import { Admin } from "./Admin";
import { User } from "./User";
import sequelize from "../config/orm";
import Chat from "./Chat";

interface FanAttributes {
  id: number;
  firstName: string;
  surname: string;
  profilePicture: string | null;
  email: string;
  whatsappNumber: string;
  whatsappCode: string | null;
  emailCode: string | null;
  countryOfResidence: string;
  gender: string;
  dateOfBirth: Date;
  userId: ForeignKey<User["id"]>;
  occupation: string;
  user?: NonAttribute<User>;
}

export type FanCreationAttributes = Optional<FanAttributes, "id">;

export class Fan
  extends Model<FanAttributes, FanCreationAttributes>
  implements FanAttributes
{
  email!: string;
  emailCode!: string | null;
  countryOfResidence!: string;
  occupation!: string;
  public profilePicture: string | null = null;
  public userId!: number;
  public id!: number;
  public firstName!: string;
  public surname!: string;
  public whatsappNumber!: string;
  public whatsappCode!: string | null;
  public country!: string;
  public dateOfBirth!: Date;
  public gender!: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
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
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    whatsappNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    whatsappCode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    countryOfResidence: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    emailCode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    occupation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "fans",
  }
);
Fan.hasMany(Chat, {
  foreignKey: "fanId",
  as: "chats",
});
