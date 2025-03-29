import {
  Model,
  DataTypes,
  Optional,
  ForeignKey,
  BelongsToGetAssociationMixin,
} from "sequelize";
import sequelize from "../config/orm";
import { Event } from "./Event";


// Define attributes for Ticket
export interface TicketAttributes {
  id: number;
  name: string;
  price: number;
  tier: string;
  perks: string[];
  eventId: ForeignKey<Event["id"]>;
}

// Define creation attributes (making id optional)
export type TicketCreationAttributes = Optional<TicketAttributes, "id">;

// Define Ticket model
export class Ticket
  extends Model<TicketAttributes, TicketCreationAttributes>
  implements TicketAttributes
{
  public id!: number;
  public name!: string;
  public price!: number;
  public tier!: string;
  public perks!: string[];
  public eventId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Association Methods
  public getEvent!: BelongsToGetAssociationMixin<Event>;
}

// Initialize Ticket model
Ticket.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    tier: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    perks: {
      type: DataTypes.ARRAY(DataTypes.STRING), // PostgreSQL only
      allowNull: false,
    },
    
    eventId: {
      type: DataTypes.INTEGER,
      references: {
        model: Event,
        key: "id",
      },
      onDelete: "CASCADE",
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "tickets",
  }
);

export default Ticket;
