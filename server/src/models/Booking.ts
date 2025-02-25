import { DataTypes, ForeignKey, Model, Optional, Sequelize } from "sequelize";
import { BookingType } from "../enums/BookingType";
import { Celebrity } from "./Celebrity";
import { Fan } from "./Fan";
import { Schedule } from "./Schedule";
import sequelize from "../config/orm";

interface BookingAttributes {
  id: number;
  type: BookingType;
  scheduleId: ForeignKey<Schedule["id"]>;
  fanId: ForeignKey<Fan["id"]>;
  celebrityId: ForeignKey<Celebrity["id"]>;
}

type BookingCreationAttributes = Optional<BookingAttributes, "id">;

export class Booking extends Model<BookingAttributes, BookingCreationAttributes>
  implements BookingAttributes {
  public id!: number;
  public type!: BookingType;
  public scheduleId!: number;
  public fanId!: number;
  public celebrityId!: number;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(models: { Fan: typeof Fan; Celebrity: typeof Celebrity; Schedule: typeof Schedule }) {
    Booking.belongsTo(models.Fan, { foreignKey: "fanId", as: "fan" });
    Booking.belongsTo(models.Celebrity, { foreignKey: "celebrityId", as: "celebrity" });
    Booking.belongsTo(models.Schedule, { foreignKey: "scheduleId", as: "schedule" });
  }
}


  Booking.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      type: {
        type: DataTypes.ENUM(...Object.values(BookingType)),
        allowNull: false,
      },
      scheduleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
      tableName: "bookings",
    }
  );

