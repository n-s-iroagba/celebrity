import { DataTypes, Model, Optional, NonAttribute, ForeignKey } from "sequelize";
import { ClubMembershipTier } from "../enums/ClubMembershipTier";
import sequelize from "../config/orm";
import { Job } from "./Job";
import { Celebrity } from "./Celebrity";
import Item from "./Item";

export interface ClubMembershipAttributes {
  id: number;
  tier: ClubMembershipTier;
  features: string;  // Store the features as a comma-separated string
  celebrityId?: ForeignKey<Celebrity['id']>;
  itemId?: ForeignKey<Item['id']>;
  item?: NonAttribute<Item>;
}

export type ClubMembershipCreationAttributes = Optional<ClubMembershipAttributes, "id" | "celebrityId" | "itemId">;

export class ClubMembership
  extends Model<ClubMembershipAttributes, ClubMembershipCreationAttributes>
  implements ClubMembershipAttributes {

  public id!: number;
  public tier!: ClubMembershipTier;
  public features!: string;  // Comma-separated string
  public celebrityId?: ForeignKey<Celebrity['id']>;
  public itemId?: ForeignKey<Item['id']>;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly jobs?: NonAttribute<Job[]>;
}

ClubMembership.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    tier: {
      type: DataTypes.ENUM(...Object.values(ClubMembershipTier)),
      allowNull: false,
      validate: {
        isIn: [Object.values(ClubMembershipTier)],
      },
    },
    features: {
      type: DataTypes.STRING,  // Use STRING for storing a comma-separated list
      allowNull: false,
      defaultValue: "",
    },
    celebrityId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "club_memberships",
    timestamps: true,
    underscored: true,
  }
);
ClubMembership.belongsTo(Celebrity, { foreignKey: "celebrityId", as: "celebrity" });
Celebrity.hasMany(ClubMembership, { foreignKey: "celebrityId", as: "clubMemberships" });

export default ClubMembership;
