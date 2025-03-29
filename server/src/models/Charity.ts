import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/orm";
import { Job } from "./Job";

interface CharityAttributes {
  id: number;
  name: string;
  description: string;
  goalAmount: number;
  raisedAmount: number;
  minimumAmount: number;
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

export class Charity
  extends Model<CharityAttributes, CharityCreationAttributes>
  implements CharityAttributes, CharityAssociationMethods
{
  goalAmount!: number;
  raisedAmount!: number;
  minimumAmount!: number;
  public id!: number;
  public name!: string;
  public description!: string;

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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 100],
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [10, 500],
      },
    },
    goalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    raisedAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    minimumAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "charities",
    timestamps: true,
  }
);

export default Charity;
