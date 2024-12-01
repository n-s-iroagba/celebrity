import { Sequelize } from "sequelize";

const sequelize = new Sequelize("celebrity", "root", "97chocho", {
  host: "localhost",
  dialect: "mysql", 
  logging: false, 
});

export default sequelize;
