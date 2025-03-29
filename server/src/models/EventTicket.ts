import { ForeignKey, Optional, Model, Sequelize, DataTypes } from "sequelize";
import { Event } from "./Event";
import sequelize from "../config/orm";

interface TicketTierAttributes {
  id: number;
  eventId: ForeignKey<Event["id"]>;
  price: number;
  tier: string;

  features: string[]
}

type TicketTierCreationAttributes = Optional<TicketTierAttributes, "id">;

export class TicketPackage extends Model<TicketTierAttributes, TicketTierCreationAttributes>
  implements TicketTierAttributes {
  public id!: number;
  public eventId!: number;

  public price!: number;
  public tier!: string;
  public features!: string[];

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(models: { Event: typeof Event }) {

  }
}

  TicketPackage.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      eventId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      tier: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      features: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      }
    },
    {
      sequelize,
      tableName: "ticket_tiers",
    }
  );

  