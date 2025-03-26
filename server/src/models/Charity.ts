import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/orm";
import { CharityGroup } from "./CharityGroup";

interface CharityAttributes {
  id: number;
  campaignName: string;
  pitch: string;
  amount: number;
}

interface CharityAssociationMethods {
  // Association methods for CharityGroup
  addGroup: (group: CharityGroup | number) => Promise<void>;
  addGroups: (groups: (CharityGroup | number)[]) => Promise<void>;
  removeGroup: (group: CharityGroup | number) => Promise<void>;
  removeGroups: (groups?: (CharityGroup | number)[]) => Promise<void>;
  hasGroup: (group: CharityGroup | number) => Promise<boolean>;
  hasGroups: (groups: (CharityGroup | number)[]) => Promise<boolean>;
  countGroups: () => Promise<number>;
  getGroups: () => Promise<CharityGroup[]>;
  setGroups: (groups: (CharityGroup | number)[]) => Promise<void>;
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
  declare addGroup: (group: CharityGroup | number) => Promise<void>;
  declare addGroups: (groups: (CharityGroup | number)[]) => Promise<void>;
  declare removeGroup: (group: CharityGroup | number) => Promise<void>;
  declare removeGroups: (groups?: (CharityGroup | number)[]) => Promise<void>;
  declare hasGroup: (group: CharityGroup | number) => Promise<boolean>;
  declare hasGroups: (groups: (CharityGroup | number)[]) => Promise<boolean>;
  declare countGroups: () => Promise<number>;
  declare getGroups: () => Promise<CharityGroup[]>;
  declare setGroups: (groups: (CharityGroup | number)[]) => Promise<void>;

  public readonly groups?: CharityGroup[];
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