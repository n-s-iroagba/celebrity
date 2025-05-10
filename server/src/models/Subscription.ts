import {
  Model,
  DataTypes,
  Optional,
  ForeignKey,
  NonAttribute,
} from "sequelize";

import sequelize from "../config/orm";
import ClubMembership from "./ClubMembership";


interface SubscriptionAttributes {
  id: number;
  status: "Active" | "Pending" | "Expired";
  isMax: boolean | null;
  dateOflastPayment: Date;
  durationInDays: number | null;
  clubMembership?: NonAttribute<ClubMembership>;
  clubMembershipId: ForeignKey<ClubMembership["id"]>;
}

type SubscriptionCreationAttributes = Optional<SubscriptionAttributes, "id">;

export class Subscription
  extends Model<SubscriptionAttributes, SubscriptionCreationAttributes>
  implements SubscriptionAttributes
{
  dateOflastPayment!: Date;
  public id!: number;
  clubMembership?: NonAttribute<ClubMembership>;
  clubMembershipId!: ForeignKey<ClubMembership["id"]>;
  public status!: "Active" | "Pending" | "Expired";
  public isMax!: boolean | null;
  public durationInDays!: number | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Subscription.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    clubMembershipId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("Active", "Pending", "Expired"),
      allowNull: false,
    },
    isMax: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    durationInDays: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    dateOflastPayment: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Subscription",
    timestamps: true,
  }
);

export default Subscription;
