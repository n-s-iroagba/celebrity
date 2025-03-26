import { Optional, Model } from "sequelize";

interface EventAttributes {
    id: number;
    name: string;
    email: string;
    password: string;
  }
  
type EventCreationAttributes = Optional<EventAttributes, "id">;
  
  export class Event extends Model<EventAttributes, EventCreationAttributes>
    implements EventAttributes {
    public id!: number;
    public name!: string;
    public email!: string;
    public password!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  }
  