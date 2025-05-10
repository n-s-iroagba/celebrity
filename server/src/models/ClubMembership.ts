import { DataTypes, Model, Optional, NonAttribute, ForeignKey } from "sequelize";

import sequelize from "../config/orm";

import { Celebrity } from "./Celebrity";


export interface ClubMembershipAttributes {
  id: number;
  tier: string;
  features: string[];
  discountRate:number;
  celebrityId?: ForeignKey<Celebrity['id']>;
  celebrity?: NonAttribute<Celebrity>;
  monthlySubscriptionAmount:number;
  annualSubscriptionDiscount:number;

}

export type ClubMembershipCreationAttributes = Optional<ClubMembershipAttributes, "id">;

export class ClubMembership
  extends Model<ClubMembershipAttributes, ClubMembershipCreationAttributes>
  implements ClubMembershipAttributes {
  public id!: number;
  public tier!: string;
  public discountRate!: number;
  public features!: string[];  // Comma-separated string
  public celebrityId?: ForeignKey<Celebrity['id']>;
  monthlySubscriptionAmount!:number;
  annualSubscriptionDiscount!:number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
 
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
      type: DataTypes.JSON, // Use STRING for storing a comma-separated list
      allowNull: false,
    },
    celebrityId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    discountRate: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    monthlySubscriptionAmount: {
      type: DataTypes.DECIMAL(10, 2),
    },
    annualSubscriptionDiscount: {
      type: DataTypes.DECIMAL(10, 2),
    
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
