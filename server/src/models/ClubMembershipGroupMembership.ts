import { DataTypes, Model } from "sequelize";
import sequelize from "../config/orm";
import { ClubMembership } from "./ClubMembership";
import { ClubMembershipGroup } from "./ClubMembershipGroup";

interface ClubMembershipGroupMembershipAttributes {
  clubMembershipId: number;
  clubMembershipGroupId: number;
}

export class ClubMembershipGroupMembership extends Model<ClubMembershipGroupMembershipAttributes> 
  implements ClubMembershipGroupMembershipAttributes {
  public clubMembershipId!: number;
  public clubMembershipGroupId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ClubMembershipGroupMembership.init(
  {
    clubMembershipId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: ClubMembership,
        key: 'id'
      }
    },
    clubMembershipGroupId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: ClubMembershipGroup,
        key: 'id'
      }
    },
  },
  {
    sequelize,
    tableName: "clubMembershipGroupMemberships",
    timestamps: true,
  }
);

export default ClubMembershipGroupMembership;