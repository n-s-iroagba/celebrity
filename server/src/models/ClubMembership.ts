import { DataTypes, ForeignKey, Model, Optional, Sequelize } from "sequelize";
import { ClubMembershipTier } from "../enums/ClubMembershipTier";
import { Celebrity } from "./Celebrity";
import { Fan } from "./Fan";
import { Job } from "./Job";
import sequelize from "../config/orm";

interface ClubMembershipAttributes {
  id: number;
  tier: ClubMembershipTier;
  JobId: ForeignKey<Job["id"]>|null;
  fanId: ForeignKey<Fan["id"]>|null;
  celebrityId: ForeignKey<Celebrity["id"]>;
}

type ClubMembershipCreationAttributes = Optional<ClubMembershipAttributes, "id">;

export class ClubMembership extends Model<ClubMembershipAttributes, ClubMembershipCreationAttributes>
  implements ClubMembershipAttributes {
  public JobId!: number  | null;
  public fanId!: number  | null;
  public id!: number;
  public tier!: ClubMembershipTier;
  public jobId!: number|null;
  public celebrityId!: number;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(models: { Fan: typeof Fan; Celebrity: typeof Celebrity; Job: typeof Job }) {
    ClubMembership.belongsTo(models.Fan, { foreignKey: "fanId", as: "fan" });
    ClubMembership.belongsTo(models.Celebrity, { foreignKey: "celebrityId", as: "celebrity" });
    ClubMembership.belongsTo(models.Job, { foreignKey: "jobId", as: "job" });
  }
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
      JobId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      fanId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      celebrityId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "clubMemberships",
    }
  );
