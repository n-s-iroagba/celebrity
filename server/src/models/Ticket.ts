import {
  Model,
  DataTypes,
  Optional,
  ForeignKey,
  BelongsToGetAssociationMixin,
} from "sequelize";
import sequelize from "../config/orm";
import { Event } from "./Event";
import Item from "./Item";


export interface TicketAttributes {
  id: number;
  name: string;
  price: number;
  tier: string;
  perks: string[];
  eventId: ForeignKey<Event["id"]>;
   itemId?:ForeignKey<Item['id']>;
}


export type TicketCreationAttributes = Optional<TicketAttributes, "id"|"itemId">;

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
  public itemId?:ForeignKey<Item['id']>;

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
      type: DataTypes.JSON, // PostgreSQL only
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
    itemId:{
      type: DataTypes.INTEGER,
      allowNull:true,
    }
  },
  {
    sequelize,
    tableName: "tickets",
  }
);
Ticket.belongsTo(Event, { foreignKey: "eventId", as: "event" });
Event.hasMany(Ticket, { foreignKey: "eventId", as: "tickets" });

export default Ticket;
