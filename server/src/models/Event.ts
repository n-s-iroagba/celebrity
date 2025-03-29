import { Optional, Model } from "sequelize";

interface EventAttributes {
  id: number;
  description:string;
  title: string;
  startDate: Date;
  endDate: Date;
}
  
type EventCreationAttributes = Optional<EventAttributes, "id">;
  
  export class Event extends Model<EventAttributes, EventCreationAttributes>
    implements EventAttributes {
    public id!: number;
   public description!: string;
   public title!: string;
   public startDate!: Date;
   public endDate!: Date;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  }
  