import { Optional, Model, Sequelize, DataTypes } from "sequelize";

interface HotelDetailAttributes {
  id: number;
  hotelType: '3_STAR' | '4_STAR' | '5_STAR' | 'BOUTIQUE';
  roomType: string;
  checkIn: Date;
  checkOut: Date;
  bookingId: number;
}
interface HotelDetailCreationAttributes extends Optional<HotelDetailAttributes, 'id'> {}
export class HotelDetail extends Model<HotelDetailAttributes, HotelDetailCreationAttributes> implements HotelDetailAttributes {
  public id!: number;
  public hotelType!: '3_STAR' | '4_STAR' | '5_STAR' | 'BOUTIQUE';
  public roomType!: string;
  public checkIn!: Date;
  public checkOut!: Date;
  public bookingId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static initModel(sequelize: Sequelize) {
    HotelDetail.init(
      {
        id: { type: DataTypes.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true },
        hotelType: { type: DataTypes.ENUM('3_STAR', '4_STAR', '5_STAR', 'BOUTIQUE'), allowNull: false },
        roomType: { type: DataTypes.STRING, allowNull: false },
        checkIn: { type: DataTypes.DATE, allowNull: false },
        checkOut: { type: DataTypes.DATE, allowNull: false },
        bookingId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
      },
      { sequelize, tableName: 'hotel_details' }
    );
    return HotelDetail;
  }

  static associate(models: any) {
    HotelDetail.belongsTo(models.Booking, { foreignKey: 'bookingId' });
  }
}
