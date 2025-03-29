import { DataTypes, Model, Optional } from "sequelize";
import { ClubMembershipTier } from "../enums/ClubMembershipTier";
import sequelize from "../config/orm";
import { Job } from "./Job";

interface ClubMembershipAttributes {
  id: number;
  tier: ClubMembershipTier;
  price: number;
  features:string[]
}

interface ClubMembershipAssociationMethods {
  // Association methods for Job
  addGroup: (group: Job) => Promise<void>;
  addGroups: (groups: Job[]) => Promise<void>;
  removeGroup: (group: Job) => Promise<void>;
  removeGroups: (groups?: Job[]) => Promise<void>;
  hasGroup: (group: Job) => Promise<boolean>;
  hasGroups: (groups: Job[]) => Promise<boolean>;
  countGroups: () => Promise<number>;
  getGroups: () => Promise<Job[]>;
  setGroups: (groups: Job[]) => Promise<void>;
}

export type ClubMembershipCreationAttributes = Optional<ClubMembershipAttributes, "id">;

export class ClubMembership 
  extends Model<ClubMembershipAttributes, ClubMembershipCreationAttributes> 
  implements ClubMembershipAttributes, ClubMembershipAssociationMethods {
 
  
  // Attributes
  public id!: number;
  public tier!: ClubMembershipTier;
  public price!: number;
  public features!: string[];

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Association methods
  declare addGroup: (group: Job) => Promise<void>;
  declare addGroups: (groups: Job[]) => Promise<void>;
  declare removeGroup: (group: Job) => Promise<void>;
  declare removeGroups: (groups?: Job[]) => Promise<void>;
  declare hasGroup: (group: Job) => Promise<boolean>;
  declare hasGroups: (groups: Job[]) => Promise<boolean>;
  declare countGroups: () => Promise<number>;
  declare getGroups: () => Promise<Job[]>;
  declare setGroups: (groups: Job[]) => Promise<void>;

  // Association properties (added by Sequelize)
  public readonly groups?: Job[];
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
    features: {
      type: DataTypes.JSON,
      allowNull: false,
    }
  },
  {
    sequelize,
    tableName: "clubMemberships",
    timestamps: true,
  }
);

// Associations are typically set up in a separate file, but you could add them here if preferred
// ClubMembership.belongsToMany(Job, { through: 'JobClubMembership' });

export default ClubMembership;
