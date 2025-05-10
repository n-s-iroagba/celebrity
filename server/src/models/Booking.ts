import { Optional, Model, Sequelize, DataTypes } from "sequelize";

interface BookingAttributes {
  id: number;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
  accessLevel: string;
  totalPrice: number;
  withGuest: boolean;
  userId: number;
  projectId: number;
}
interface BookingCreationAttributes extends Optional<BookingAttributes, 'id' | 'status'> {}
export class Booking extends Model<BookingAttributes, BookingCreationAttributes> implements BookingAttributes {
  public id!: number;
  public status!: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
  public accessLevel!: string;
  public totalPrice!: number;
  public withGuest!: boolean;
  public userId!: number;
  public projectId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static initModel(sequelize: Sequelize) {
    Booking.init(
      {
        id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
        status: { type: DataTypes.ENUM('PENDING', 'CONFIRMED', 'CANCELLED'), defaultValue: 'PENDING' },
        accessLevel: { type: DataTypes.STRING, allowNull: false },
        totalPrice: { type: DataTypes.FLOAT, allowNull: false },
        withGuest: { type: DataTypes.BOOLEAN, defaultValue: false },
        userId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
        projectId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
      },
      { sequelize, tableName: 'bookings' }
    );
    return Booking;
  }

  static associate(models: any) {
    Booking.belongsTo(models.User, { foreignKey: 'userId' });
    Booking.belongsTo(models.Project, { foreignKey: 'projectId' });
    Booking.hasOne(models.FlightDetail, { foreignKey: 'bookingId' });
    Booking.hasOne(models.HotelDetail, { foreignKey: 'bookingId' });
    Booking.hasMany(models.BookingAddon, { foreignKey: 'bookingId' });
    Booking.hasOne(models.Payment, { foreignKey: 'bookingId' });
  }
}