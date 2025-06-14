import { DataTypes, Model, type Optional, type NonAttribute, type ForeignKey } from "sequelize"
import sequelize from "../config/orm"
import type { Celebrity } from "./Celebrity"
import type { PerkDetail } from "../types/PerkDetail" // Import the PerkDetail type

export interface ClubMembershipAttributes {
  id: number
  tier: string // This is the name of the membership tier, e.g., "Gold", "Silver"
  features: PerkDetail[] // <<<< UPDATED: This now expects an array of PerkDetail objects
  discountRate: number
  celebrityId?: ForeignKey<Celebrity["id"]>
  celebrity?: NonAttribute<Celebrity>
  monthlySubscriptionAmount: number
  annualSubscriptionDiscount: number
  // Ensure other relevant fields like price, duration are here or derived correctly
  // For the frontend, 'name' was used for the tier name, 'price', 'durationDays'
  // 'tier' here likely corresponds to 'name' on the frontend IClubMembership.
}

export type ClubMembershipCreationAttributes = Optional<ClubMembershipAttributes, "id">

export class ClubMembership
  extends Model<ClubMembershipAttributes, ClubMembershipCreationAttributes>
  implements ClubMembershipAttributes
{
  public id!: number
  public tier!: string
  public features!: PerkDetail[] // <<<< UPDATED
  public discountRate!: number
  public celebrityId?: ForeignKey<Celebrity["id"]>
  public monthlySubscriptionAmount!: number
  public annualSubscriptionDiscount!: number

  public readonly createdAt!: Date
  public readonly updatedAt!: Date

  // Associations
  public celebrity?: NonAttribute<Celebrity>
}

ClubMembership.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    tier: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    features: {
      type: DataTypes.JSON, // Sequelize's JSON type can store arrays of objects
      allowNull: false,
      defaultValue: [], // It's good practice to have a default
    },
    celebrityId: {
      type: DataTypes.INTEGER,
      allowNull: true, // Or false, depending on your design
      references: {
        model: "celebrities", // Name of the table
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL", // Or 'CASCADE'
    },
    discountRate: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.0,
    },
    monthlySubscriptionAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false, // Assuming price is mandatory
    },
    annualSubscriptionDiscount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.0,
    },
  },
  {
    sequelize,
    tableName: "club_memberships",
    timestamps: true,
    underscored: true,
  },
)

// Define associations if not already defined elsewhere
// Ensure Celebrity model is imported and defined correctly
// ClubMembership.belongsTo(Celebrity, { foreignKey: "celebrityId", as: "celebrity" });
// Celebrity.hasMany(ClubMembership, { foreignKey: "celebrityId", as: "clubMemberships" });

export default ClubMembership
