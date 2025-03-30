// models/Event.ts
import { Optional, Model, NonAttribute, ForeignKey, DataTypes, BelongsToGetAssociationMixin } from "sequelize";
import sequelize from "../config/orm"; 
import { Ticket } from "./Ticket";
import { Job } from "./Job";
import { Celebrity } from "./Celebrity";

export interface EventAttributes {
  id: number;
  title: string;
  startDate: Date;
  endDate: Date;
  location: string;
  description: string;
  image: string;
  tickets?: NonAttribute<Ticket[]>;
  celebrityId:ForeignKey<Celebrity['id']>
  celebrity?: NonAttribute<Celebrity>;
}

export type EventCreationAttributes = Optional<EventAttributes, "id">;

export class Event extends Model<EventAttributes, EventCreationAttributes> implements EventAttributes {
  public id!: number;
  public title!: string;
  public startDate!: Date;
  public endDate!: Date;
  public location!: string;
  public description!: string;
  public image!: string;
  public celebrityId!:ForeignKey<Celebrity['id']>
  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Association methods
  public getJob!: BelongsToGetAssociationMixin<Job>;
  public getTickets!: () => Promise<Ticket[]>;
  public getCelebrity!: () => Promise<Celebrity>;
}

Event.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 100]
      }
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true
      }
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
        isAfterStartDate(value: Date) {
          if (this.startDate && value <= this.startDate) {
            throw new Error('End date must be after start date');
          }
        }
      }
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [10, 2000]
      }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true
      }
    },
  },
  {
    sequelize,
    tableName: "events",
    timestamps: true,
  }
);