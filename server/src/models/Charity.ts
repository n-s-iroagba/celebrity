import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/orm";
import { Job } from "./Job";

interface CharityAttributes {
  id: number;
  campaignName: string;
  pitch: string;
  amount: number;
}

interface CharityAssociationMethods {
  // Association methods for Job
  addGroup: (group: Job | number) => Promise<void>;
  addGroups: (groups: (Job | number)[]) => Promise<void>;
  removeGroup: (group: Job | number) => Promise<void>;
  removeGroups: (groups?: (Job | number)[]) => Promise<void>;
  hasGroup: (group: Job | number) => Promise<boolean>;
  hasGroups: (groups: (Job | number)[]) => Promise<boolean>;
  countGroups: () => Promise<number>;
  getGroups: () => Promise<Job[]>;
  setGroups: (groups: (Job | number)[]) => Promise<void>;
}

export type CharityCreationAttributes = Optional<CharityAttributes, "id">;

export class Charity extends Model<CharityAttributes, CharityCreationAttributes>
  implements CharityAttributes, CharityAssociationMethods {

  public id!: number;
  public campaignName!: string;
  public pitch!: string;
  public amount!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Association methods
  declare addGroup: (group: Job | number) => Promise<void>;
  declare addGroups: (groups: (Job | number)[]) => Promise<void>;
  declare removeGroup: (group: Job | number) => Promise<void>;
  declare removeGroups: (groups?: (Job | number)[]) => Promise<void>;
  declare hasGroup: (group: Job | number) => Promise<boolean>;
  declare hasGroups: (groups: (Job | number)[]) => Promise<boolean>;
  declare countGroups: () => Promise<number>;
  declare getGroups: () => Promise<Job[]>;
  declare setGroups: (groups: (Job | number)[]) => Promise<void>;

  public readonly groups?: Job[];
}

Charity.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    campaignName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 100]
      }
    },
    pitch: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [10, 500]
      }
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0.01
      }
    }
  },
  {
    sequelize,
    tableName: "charities",
    timestamps: true,
  }
);

export default Charity;