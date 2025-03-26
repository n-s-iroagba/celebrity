import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/orm";
import { ClubMembership } from "./ClubMembership";

interface ClubMembershipGroupAttributes {
  id: number;
  name: string;
  description?: string;
  isActive: boolean;
}

interface ClubMembershipGroupAssociationMethods {
  // Association methods for ClubMembership
  addMembership: (membership: ClubMembership) => Promise<void>;
  addMemberships: (memberships: ClubMembership[]) => Promise<void>;
  removeMembership: (membership: ClubMembership) => Promise<void>;
  removeMemberships: (memberships?: ClubMembership[]) => Promise<void>;
  hasMembership: (membership: ClubMembership) => Promise<boolean>;
  hasMemberships: (memberships: ClubMembership[]) => Promise<boolean>;
  countMemberships: () => Promise<number>;
  getMemberships: () => Promise<ClubMembership[]>;
  setMemberships: (memberships: ClubMembership[]) => Promise<void>;
}

export type ClubMembershipGroupCreationAttributes = Optional<ClubMembershipGroupAttributes, "id">;

export class ClubMembershipGroup 
  extends Model<ClubMembershipGroupAttributes, ClubMembershipGroupCreationAttributes>
  implements ClubMembershipGroupAttributes, ClubMembershipGroupAssociationMethods {

  // Attributes
  public id!: number;
  public name!: string;
  public description?: string;
  public isActive!: boolean;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Association methods
  declare addMembership: (membership: ClubMembership) => Promise<void>;
  declare addMemberships: (memberships: ClubMembership[]) => Promise<void>;
  declare removeMembership: (membership: ClubMembership) => Promise<void>;
  declare removeMemberships: (memberships?: ClubMembership[]) => Promise<void>;
  declare hasMembership: (membership: ClubMembership) => Promise<boolean>;
  declare hasMemberships: (memberships: ClubMembership[]) => Promise<boolean>;
  declare countMemberships: () => Promise<number>;
  declare getMemberships: () => Promise<ClubMembership[]>;
  declare setMemberships: (memberships: ClubMembership[]) => Promise<void>;

  // Association properties (added by Sequelize)
  public readonly memberships?: ClubMembership[];
}

ClubMembershipGroup.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 100]
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: "clubMembershipGroups",
    timestamps: true,
  }
);

export default ClubMembershipGroup;