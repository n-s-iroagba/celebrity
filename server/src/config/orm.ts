// db/index.ts
import { Sequelize } from "sequelize";
import {config }from "./envConfig";

const env = process.env.NODE_ENV || "development";
const dbConfig = config[env as keyof typeof config];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect as "mysql",
    logging: env === "development", // Enable logging only in development
  }
);

export default sequelize;
