import { Model, DataTypes, Optional, Sequelize, ForeignKey } from "sequelize";
import { Celebrity } from "./Celebrity";
import { TicketTier } from "./TicketTiers";
import sequelize from "../config/orm";

interface EventAttributes {
  id: number;
  celebrityId: ForeignKey<Celebrity["id"]>;
  date: Date;
  time: string;
  venue: string;
}

type EventCreationAttributes = Optional<EventAttributes, "id">;

export class Event extends Model<EventAttributes, EventCreationAttributes>
  implements EventAttributes {
  public id!: number;
  public celebrityId!: number;
  public date!: Date;
  public time!: string;
  public venue!: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(models: { Celebrity: typeof Celebrity; TicketTier: typeof TicketTier }) {
    Event.belongsTo(models.Celebrity, { foreignKey: "celebrityId", as: "celebrity" });
    Event.hasMany(models.TicketTier, { foreignKey: "eventId", as: "ticketTiers" });
  }
}


  Event.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      celebrityId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      time: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      venue: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "events",
    }
  );

