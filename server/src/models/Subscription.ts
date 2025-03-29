import {
    Model,
    DataTypes,
    Optional,
    ForeignKey,
    NonAttribute,
  } from "sequelize";

  import { Ticket } from "./Ticket";
  import { Tour } from "./Tour";
import sequelize from "../config/orm";
import { Celebrity } from "./Celebrity";
import Charity from "./Charity";
import ClubMembership from "./ClubMembership";
import { Fan } from "./Fan";
import { Souvenir } from "./Souvenir";
  
  interface SubscriptionAttributes {
    id: number;
    celebrityId: ForeignKey<Celebrity["id"]>;
    fanId: ForeignKey<Fan["id"]>;
    itemType: "ClubMembership" | "Charity" | "Ticket" | "Souvenir" | "Tour";
    itemId: number;
    status: "In Transit" | "Active" | "Pending" | "Expired";
    isMax: boolean | null;
    dateOflastPayment:Date;
    durationInDays: number | null;
    celebrity?: NonAttribute<Celebrity>;
    fan?: NonAttribute<Fan>;
    item?: NonAttribute<ClubMembership | Charity | Ticket | Souvenir | Tour>;
  }
  
  type SubscriptionCreationAttributes = Optional<SubscriptionAttributes, "id">;
  
  export class Subscription
    extends Model<SubscriptionAttributes, SubscriptionCreationAttributes>
    implements SubscriptionAttributes
  {
    dateOflastPayment!: Date;
;
    item?: NonAttribute<ClubMembership | Charity | Ticket | Souvenir | Tour> | undefined;
    public id!: number;
    public celebrityId!: number;
    public fanId!: number;
    public itemType!: "ClubMembership" | "Charity" | "Ticket" | "Souvenir" | "Tour";
    public itemId!: number;
    public status!: "In Transit" | "Active" | "Pending" | "Expired";
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
      celebrityId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Celebrity,
          key: "id",
        },
      },
      fanId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Fan,
          key: "id",
        },
      },
      itemType: {
        type: DataTypes.ENUM("ClubMembership", "Charity", "Ticket", "Souvenir", "Tour"),
        allowNull: false,
      },
      itemId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("In Transit", "Active", "Pending", "Expired"),
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
      }
    },
    {
      sequelize,
      modelName: "Subscription",
      timestamps: true,
    }
  );
  
  
  export default Subscription;
  