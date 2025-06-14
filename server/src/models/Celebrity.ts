import { Model, DataTypes, type Optional, type NonAttribute, type ForeignKey } from "sequelize"
import sequelize from "../config/orm"
import type Chat from "./Chat"
import type ClubMembership from "./ClubMembership"
import type { Project } from "./Project"
import type Souvenir from "./Souvenir"
import type Charity from "./Charity"
import { Event } from "./Event"
import type { User } from "./User" // Import User model

export interface CelebrityAttributes {
  id: number
  firstName: string
  surname: string
  bio: string
  image: string
  isConfirmed: boolean
  stageName: string
  userId: ForeignKey<User["id"]> // <-- ADDED: Foreign key to User
  // Associations
  user?: NonAttribute<User>
  chats?: NonAttribute<Chat[]>
  events?: NonAttribute<Event[]>
  clubMembershipPackages?: NonAttribute<ClubMembership[]>
  sourvenirs?: NonAttribute<Souvenir[]>
  charityCampaigns?: NonAttribute<Charity[]>
  projects?: NonAttribute<Project[]>
}

// Make userId optional during creation if it's set via association or later
export type CelebrityCreationAttributes = Optional<CelebrityAttributes, "id">

export class Celebrity extends Model<CelebrityAttributes, CelebrityCreationAttributes> implements CelebrityAttributes {
  public id!: number
  public firstName!: string
  public surname!: string
  public bio!: string
  public image!: string
  public isConfirmed!: boolean
  public stageName!: string
  public userId!: number // <-- ADDED: Ensure it's a number

  // Timestamps
  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  // Associations
  public readonly user?: User
  public readonly events?: Event[]
  // ... other associations
}

Celebrity.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    stageName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isConfirmed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false, // Good to have a default
    },
    userId: {
      // <-- ADDED: Column definition
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true, // Each user can only be one celebrity
      references: {
        model: "users", // Name of the User table
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE", // Or SET NULL / RESTRICT depending on your policy
    },
  },
  {
    sequelize,
    tableName: "celebrities",
  },
)

// Define associations
// Celebrity.belongsTo(User, { foreignKey: "userId", as: "user" }); // Defined below with User.hasOne
Celebrity.hasMany(Event, {
  foreignKey: "celebrityId",
  as: "events",
})
// ... other Celebrity associations (Chat, ClubMembership, etc.)
// Example: Celebrity.hasMany(Chat, { foreignKey: 'celebrityId', as: 'chats' });
