import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/orm";
import { Charity } from "./Charity";

interface CharityGroupAttributes {
  id: number;
  name: string;
  description?: string;
  isActive: boolean;
}

interface CharityGroupAssociationMethods {
  // Association methods for Charity
  addCharity: (charity: Charity | number) => Promise<void>;
  addCharities: (charities: (Charity | number)[]) => Promise<void>;
  removeCharity: (charity: Charity | number) => Promise<void>;
  removeCharities: (charities?: (Charity | number)[]) => Promise<void>;
  hasCharity: (charity: Charity | number) => Promise<boolean>;
  hasCharities: (charities: (Charity | number)[]) => Promise<boolean>;
  countCharities: () => Promise<number>;
  getCharities: () => Promise<Charity[]>;
  setCharities: (charities: (Charity | number)[]) => Promise<void>;
}

export type CharityGroupCreationAttributes = Optional<CharityGroupAttributes, "id">;

export class CharityGroup extends Model<CharityGroupAttributes, CharityGroupCreationAttributes>
  implements CharityGroupAttributes, CharityGroupAssociationMethods {

  public id!: number;
  public name!: string;
  public description?: string;
  public isActive!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Association methods
  declare addCharity: (charity: Charity | number) => Promise<void>;
  declare addCharities: (charities: (Charity | number)[]) => Promise<void>;
  declare removeCharity: (charity: Charity | number) => Promise<void>;
  declare removeCharities: (charities?: (Charity | number)[]) => Promise<void>;
  declare hasCharity: (charity: Charity | number) => Promise<boolean>;
  declare hasCharities: (charities: (Charity | number)[]) => Promise<boolean>;
  declare countCharities: () => Promise<number>;
  declare getCharities: () => Promise<Charity[]>;
  declare setCharities: (charities: (Charity | number)[]) => Promise<void>;

  public readonly charities?: Charity[];
}

CharityGroup.init(
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
        len: [2, 100],
      },
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
    tableName: "charityGroups",
    timestamps: true,
  }
);

export default CharityGroup;