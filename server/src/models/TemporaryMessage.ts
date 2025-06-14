import { Model, DataTypes, type Optional, type ForeignKey, type NonAttribute } from "sequelize"
import sequelize from "../config/orm"
import { TemporaryChat } from "./TemporaryChat"

export type TemporaryMessageMediaType = "text" | "video" | "voice" | "image"

export interface TemporaryMessageAttributes {
  id: number
  temporaryChatId: ForeignKey<TemporaryChat["id"]>
  // No senderId needed as it's always the guest user
  content: string
  mediaType: TemporaryMessageMediaType
  mediaUrl: string | null
  createdAt?: Date
  updatedAt?: Date

  temporaryChat?: NonAttribute<TemporaryChat>
}

export interface TemporaryMessageCreationAttributes
  extends Optional<TemporaryMessageAttributes, "id" | "createdAt" | "updatedAt" | "mediaUrl"> {}

export class TemporaryMessage
  extends Model<TemporaryMessageAttributes, TemporaryMessageCreationAttributes>
  implements TemporaryMessageAttributes
{
  public id!: number
  public temporaryChatId!: ForeignKey<TemporaryChat["id"]>
  public content!: string
  public mediaType!: TemporaryMessageMediaType
  public mediaUrl!: string | null

  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  public temporaryChat?: NonAttribute<TemporaryChat>
}

TemporaryMessage.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    temporaryChatId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "temporary_chats", // Name of the TemporaryChat table
        key: "id",
      },
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    mediaType: {
      type: DataTypes.ENUM("text", "video", "voice", "image"),
      allowNull: false,
      defaultValue: "text",
    },
    mediaUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "temporary_messages",
    timestamps: true,
  },
)

TemporaryMessage.belongsTo(TemporaryChat, { foreignKey: "temporaryChatId", as: "temporaryChat" })
TemporaryChat.hasMany(TemporaryMessage, { foreignKey: "temporaryChatId", as: "temporaryMessages" })
