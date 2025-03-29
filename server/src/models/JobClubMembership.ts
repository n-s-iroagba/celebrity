import { DataTypes, Model } from "sequelize";
import sequelize from "../config/orm";
import { ClubMembership } from "./ClubMembership";
import { Job } from "./Job";

interface JobClubMembershipAttributes {
  clubMembershipId: number;
  jobId: number;
}

export class JobClubMembership extends Model<JobClubMembershipAttributes> 
  implements JobClubMembershipAttributes {
  public clubMembershipId!: number;
  public jobId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

JobClubMembership.init(
  {
    clubMembershipId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: ClubMembership,
        key: 'id'
      }
    },
    jobId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: Job,
        key: 'id'
      }
    },
  },
  {
    sequelize,
    tableName: "jobMemberships",
    timestamps: true,
  }
);

export default JobClubMembership;