import {
    Model,
    DataTypes,
    Optional,
    ForeignKey,
    NonAttribute,
  } from "sequelize";
import sequelize from "../config/orm";
import { Celebrity } from "./Celebrity";
import Chat from "./Chat";
import { Fan } from "./Fan";
import { Tour } from "./Tour";

  export interface JobAttributes {
    id: number;
    fanId:ForeignKey<Fan['id']>;
    celebrityId:ForeignKey<Celebrity['id']>;
    celebrity?:NonAttribute<Celebrity>
    fan?:NonAttribute<Fan>
    chat?:NonAttribute<Chat>
    tours?: NonAttribute<Tour[]>;
    events?:NonAttribute<Event[]>
  }
  export type JobCreationAttributes = Optional<JobAttributes, "id"|'celebrity'|'fan'|'chat'|'tours'|'events'>;
  
  export class Job extends Model<JobAttributes,JobCreationAttributes> implements JobAttributes {
    fanId!: number
    celebrityId!: number
    public id!: number;
    celebrity?:NonAttribute<Celebrity>
    fan?:NonAttribute<Fan>
    chat?:NonAttribute<Chat>
    tours?: NonAttribute<Tour[]>;
    events?:NonAttribute<Event[]>

  
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  }
  

    Job.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        fanId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        celebrityId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        
      },
      {
        sequelize,
        tableName: 'jobs',
      }
    );

Job.belongsTo(Celebrity, { foreignKey: "celebrityId", as: "celebrity" });
Celebrity.hasMany(Job, { foreignKey: "celebrityId", as: "jobs" });


  
