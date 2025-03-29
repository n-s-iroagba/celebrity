import { Optional, Model, NonAttribute, ForeignKey, DataTypes } from "sequelize";
import sequelize  from "../config/orm"; 
import { Ticket } from "./Ticket";
import { Job } from "./Job";

interface EventAttributes {
  id: number;
  title: string;
  startDate: Date;
  endDate: Date;
  location: string;
  description: string;
  image: string;
  tickets?: NonAttribute<Ticket[]>;
  jobId: ForeignKey<Job["id"]>;
  job?: NonAttribute<Job>;
}

type EventCreationAttributes = Optional<EventAttributes, "id">;

export class Event extends Model<EventAttributes, EventCreationAttributes> implements EventAttributes {
  public id!: number;
  public title!: string;
  public startDate!: Date;
  public endDate!: Date;
  public location!: string;
  public description!: string;
  public image!: string;
  public jobId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
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
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jobId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Job,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Event",
    timestamps: true,
  }
);



export default Event;
