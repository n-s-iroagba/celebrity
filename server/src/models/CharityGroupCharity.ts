import { DataTypes, Model } from "sequelize";
import sequelize from "../config/orm";
import { Charity } from "./Charity";
import { CharityGroup } from "./CharityGroup";

interface CharityGroupCharityAttributes {
  charityId: number;
  charityGroupId: number;
  // Additional fields can be added here if needed
  // e.g., joinedAt: Date;
}

export class CharityGroupCharity 
  extends Model<CharityGroupCharityAttributes> 
  implements CharityGroupCharityAttributes {
  
  public charityId!: number;
  public charityGroupId!: number;
  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

CharityGroupCharity.init(
  {
    charityId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: Charity,
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    charityGroupId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: CharityGroup,
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }
  },
  {
    sequelize,
    tableName: 'charityGroupCharities',
    timestamps: true,
    underscored: true
  }
);

export default CharityGroupCharity;