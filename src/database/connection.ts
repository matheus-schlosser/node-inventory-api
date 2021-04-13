import {Sequelize} from "sequelize"
import {environment} from "../environment"

export const connection = new Sequelize(
  environment.DATABASE.DATABASE,
  environment.DATABASE.USERNAME,
  environment.DATABASE.PASSWORD,
  {
    host: environment.DATABASE.HOST,
    dialect: environment.DATABASE.DIALECT,
    logging: environment.DATABASE.DEBUG,
    define: {
      collate: "latin1_swedish_ci",
      charset: "latin1",
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    timezone: "-03:00"
  },
)

connection.authenticate()
  .catch((err) => {
    console.log({environment});
    console.log("MSYQL CONNECT ERROR", err);     
  })
