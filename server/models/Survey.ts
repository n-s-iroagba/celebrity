import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database"; // Assuming database config is in this path

class Survey extends Model {}

Survey.init(
  {
    step: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    selectedCeleb: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    formData: {
      type: DataTypes.JSON, // JSON field for dynamic form data
      allowNull: false,
    },
    fanDetails: {
      type: DataTypes.JSON, // JSON field for fan details
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Survey",
  }
);

export default Survey;