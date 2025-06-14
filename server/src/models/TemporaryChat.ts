import { Model, DataTypes, type Optional, type ForeignKey, type NonAttribute } from "sequelize"
import sequelize from "../config/orm"
import { Celebrity } from "./Celebrity"
import type { TemporaryMessage } from "./TemporaryMessage" // Will create this next

export interface TemporaryChatAttributes {
  id: number
  celebrityId: ForeignKey<Celebrity["id"]>
  sessionId: string // UUID to identify the temporary session
  expiresAt: Date
  createdAt?: Date
  updatedAt?: Date

  // Associations
  celebrity?: NonAttribute<Celebrity>
  temporaryMessages?: NonAttribute<TemporaryMessage[]>
}

export interface TemporaryChatCreationAttributes
  extends Optional<TemporaryChatAttributes, "id" | "createdAt" | "updatedAt" | "expiresAt"> {}

export class TemporaryChat
  extends Model<TemporaryChatAttributes, TemporaryChatCreationAttributes>
  implements TemporaryChatAttributes
{
  public id!: number
  public celebrityId!: ForeignKey<Celebrity["id"]>
  public sessionId!: string
  public expiresAt!: Date

  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  public celebrity?: NonAttribute<Celebrity>
  public readonly temporaryMessages?: NonAttribute<TemporaryMessage[]>

  public static associations: {
    celebrity: any // Define properly if needed for eager loading
    temporaryMessages: any
  }
}

TemporaryChat.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    celebrityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "celebrities", // Name of the Celebrity table
        key: "id",
      },
    },
    sessionId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "temporary_chats",
    timestamps: true,
  },
)

TemporaryChat.belongsTo(Celebrity, { foreignKey: "celebrityId", as: "celebrity" })
Celebrity.hasMany(TemporaryChat, { foreignKey: "celebrityId", as: "temporaryChats" })
