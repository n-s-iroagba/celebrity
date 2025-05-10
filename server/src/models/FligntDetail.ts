import { DataTypes, Model, Optional, Sequelize } from "sequelize";

/**
 * 4. FlightDetail Model
 */
interface FlightDetailAttributes {
  id: number;
  flightClass: 'ECONOMY' | 'BUSINESS' | 'FIRST' | 'PRIVATE';
  arrivalAirport: string;
  departureAirport: string;
  arrivalDate: Date;
  departureDate: Date;
  airportPickup: boolean;
  bookingId: number;
}
interface FlightDetailCreationAttributes extends Optional<FlightDetailAttributes, 'id'> {}
export class FlightDetail extends Model<FlightDetailAttributes, FlightDetailCreationAttributes> implements FlightDetailAttributes {
  public id!: number;
  public flightClass!: 'ECONOMY' | 'BUSINESS' | 'FIRST' | 'PRIVATE';
  public arrivalAirport!: string;
  public departureAirport!: string;
  public arrivalDate!: Date;
  public departureDate!: Date;
  public airportPickup!: boolean;
  public bookingId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static initModel(sequelize: Sequelize) {
    FlightDetail.init(
      {
        id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
        flightClass: { type: DataTypes.ENUM('ECONOMY', 'BUSINESS', 'FIRST', 'PRIVATE'), allowNull: false },
        arrivalAirport: { type: DataTypes.STRING, allowNull: false },
        departureAirport: { type: DataTypes.STRING, allowNull: false },
        arrivalDate: { type: DataTypes.DATE, allowNull: false },
        departureDate: { type: DataTypes.DATE, allowNull: false },
        airportPickup: { type: DataTypes.BOOLEAN, defaultValue: false },
        bookingId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
      },
      { sequelize, tableName: 'flight_details' }
    );
    return FlightDetail;
  }

  static associate(models: any) {
    FlightDetail.belongsTo(models.Booking, { foreignKey: 'bookingId' });
  }
}