import { Model, DataTypes, type Optional, type Sequelize } from "sequelize"

interface ProjectAttributes {
  id: number
  title: string
  description: string
  type: "Tour" | "Reservation"
  location: string // For 'Tour' type, can be optional for 'Reservation' if always virtual
  startDate: Date
  endDate: Date
  accessLevels: object // May not be relevant for 'Reservation' type, or could define different slot access
  isActive: boolean
  celebrityId: number
  pricePerSlot?: number
  slotDurationMinutes?: number
  slotIntervalMinutes?: number
  images?: string[] // Array of image URLs/paths
}
interface ProjectCreationAttributes
  extends Optional<ProjectAttributes, "id" | "isActive" | "location" | "accessLevels" | "images"> {}
export class Project extends Model<ProjectAttributes, ProjectCreationAttributes> implements ProjectAttributes {
  public id!: number
  public title!: string
  public description!: string
  public location!: string
  public startDate!: Date
  public endDate!: Date
  public type!: "Tour" | "Reservation"
  public accessLevels!: object
  public isActive!: boolean
  public celebrityId!: number
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
  public pricePerSlot?: number
  public slotDurationMinutes?: number
  public slotIntervalMinutes?: number
  public images?: string[]

  static initModel(sequelize: Sequelize) {
    Project.init(
      {
        id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
        title: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.TEXT, allowNull: false },
        location: { type: DataTypes.STRING, allowNull: true }, // Made optional
        startDate: { type: DataTypes.DATE, allowNull: false },
        endDate: { type: DataTypes.DATE, allowNull: false },
        accessLevels: { type: DataTypes.JSON, allowNull: true }, // Made optional
        isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
        celebrityId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
        type: {
          type: DataTypes.ENUM("Tour", "Reservation"),
          allowNull: false,
        },
        pricePerSlot: { type: DataTypes.FLOAT, allowNull: true },
        slotDurationMinutes: { type: DataTypes.INTEGER, allowNull: true },
        slotIntervalMinutes: { type: DataTypes.INTEGER, defaultValue: 0, allowNull: true },
        images: { type: DataTypes.JSON, allowNull: true }, // Store as JSON array of strings
      },
      { sequelize, tableName: "projects" },
    )
    return Project
  }

  static associate(models: any) {
    Project.belongsTo(models.User, { as: "celebrity", foreignKey: "celebrityId" })
    Project.hasMany(models.Booking, { foreignKey: "projectId" })
    Project.hasMany(models.Souvenir, { foreignKey: "projectId" })
  }
}
