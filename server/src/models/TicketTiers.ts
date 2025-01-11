import { ForeignKey, Optional, Model, Sequelize, DataTypes } from "sequelize";
import { Event } from "./Event";

interface TicketTierAttributes {
  id: number;
  eventId: ForeignKey<Event["id"]>;
  title: string;
  price: number;
}

type TicketTierCreationAttributes = Optional<TicketTierAttributes, "id">;

export class TicketTier extends Model<TicketTierAttributes, TicketTierCreationAttributes>
  implements TicketTierAttributes {
  public id!: number;
  public eventId!: number;
  public title!: string;
  public price!: number;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(models: { Event: typeof Event }) {

  }
}

export const initializeTicketTier = (sequelize: Sequelize) => {
  TicketTier.init(
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
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "ticket_tiers",
    }
  );
};
  