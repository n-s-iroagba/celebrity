import { DataTypes, Model, Optional } from "sequelize";
import { ClubMembershipTier } from "../enums/ClubMembershipTier";
import sequelize from "../config/orm";
import { ClubMembershipGroup } from "./ClubMembershipGroup";

interface ClubMembershipAttributes {
  id: number;
  tier: ClubMembershipTier;
  price: number;
}

interface ClubMembershipAssociationMethods {
  // Association methods for ClubMembershipGroup
  addGroup: (group: ClubMembershipGroup) => Promise<void>;
  addGroups: (groups: ClubMembershipGroup[]) => Promise<void>;
  removeGroup: (group: ClubMembershipGroup) => Promise<void>;
  removeGroups: (groups?: ClubMembershipGroup[]) => Promise<void>;
  hasGroup: (group: ClubMembershipGroup) => Promise<boolean>;
  hasGroups: (groups: ClubMembershipGroup[]) => Promise<boolean>;
  countGroups: () => Promise<number>;
  getGroups: () => Promise<ClubMembershipGroup[]>;
  setGroups: (groups: ClubMembershipGroup[]) => Promise<void>;
}

export type ClubMembershipCreationAttributes = Optional<ClubMembershipAttributes, "id">;

export class ClubMembership 
  extends Model<ClubMembershipAttributes, ClubMembershipCreationAttributes> 
  implements ClubMembershipAttributes, ClubMembershipAssociationMethods {
  
  // Attributes
  public id!: number;
  public tier!: ClubMembershipTier;
  public price!: number;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Association methods
  declare addGroup: (group: ClubMembershipGroup) => Promise<void>;
  declare addGroups: (groups: ClubMembershipGroup[]) => Promise<void>;
  declare removeGroup: (group: ClubMembershipGroup) => Promise<void>;
  declare removeGroups: (groups?: ClubMembershipGroup[]) => Promise<void>;
  declare hasGroup: (group: ClubMembershipGroup) => Promise<boolean>;
  declare hasGroups: (groups: ClubMembershipGroup[]) => Promise<boolean>;
  declare countGroups: () => Promise<number>;
  declare getGroups: () => Promise<ClubMembershipGroup[]>;
  declare setGroups: (groups: ClubMembershipGroup[]) => Promise<void>;

  // Association properties (added by Sequelize)
  public readonly groups?: ClubMembershipGroup[];
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
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "clubMemberships",
    timestamps: true,
  }
);

// Associations are typically set up in a separate file, but you could add them here if preferred
// ClubMembership.belongsToMany(ClubMembershipGroup, { through: 'ClubMembershipGroupMembership' });

export default ClubMembership;
