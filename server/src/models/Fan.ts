import { DataTypes, Model, type Optional, type ForeignKey, type NonAttribute } from "sequelize"
import sequelize from "../config/orm"
import type { User } from "./User" // Ensure User type is available if needed for associations

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  NON_BINARY = "NON_BINARY",
  PREFER_NOT_TO_SAY = "PREFER_NOT_TO_SAY",
}
export interface FanAttributes {
  id: number
  userId: ForeignKey<User["id"]>
  firstName: string
  surname: string
  profilePicture?: string | null
  countryOfResidence?: string | null // Made optional for initial signup
  gender?: Gender | null // Made optional for initial signup
  dateOfBirth?: Date | null // Made optional for initial signup
  occupation?: string | null // Made optional

  user?: NonAttribute<User>
}

export type FanCreationAttributes = Optional<
  FanAttributes,
  "id" | "profilePicture" | "countryOfResidence" | "gender" | "dateOfBirth" | "occupation"
>

export class Fan extends Model<FanAttributes, FanCreationAttributes> implements FanAttributes {
  public id!: number
  public userId!: number
  public firstName!: string
  public surname!: string
  public profilePicture?: string | null
  public countryOfResidence?: string | null
  public gender?: Gender | null
  public dateOfBirth?: Date | null
  public occupation?: string | null

  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  public readonly user?: User
}

Fan.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true, // A user should only have one fan profile
      references: {
        model: "users", // Name of the table
        key: "id",
      },
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profilePicture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    countryOfResidence: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gender: {
      type: DataTypes.ENUM(...Object.values(Gender)),
      allowNull: true,
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY, // Use DATEONLY if time is not important
      allowNull: true,
    },
    occupation: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "fans",
  },
)
