import terminal from "child_process"
import terminalArgs from "command-line-args"
import * as dotenv from "dotenv"
import fs from "fs"
import {environmentBy} from "../src/environment"

dotenv.config()

const terminalOptionsDefault: any = [
  { name: "env", alias: "e", type: String },
  { name: "loggin", type: Boolean },
  { name: "refresh", type: Boolean },
]

const options = terminalArgs(terminalOptionsDefault)

async function generateConfigJSON(NODE_ENV: any, config: any) {
  fs.writeFileSync(`sequelize-config-temp.json`, JSON.stringify({
    [NODE_ENV]: {
      username: config.DATABASE.USERNAME,
      password: config.DATABASE.PASSWORD,
      database: config.DATABASE.DATABASE,
      host: config.DATABASE.HOST,
      dialect: config.DATABASE.DIALECT,
      logging: options.loggin || false,
    },
  }, null, 4))
}

async function removeConfigJSON() {
  if ((fs.existsSync(`sequelize-config-temp.json`))) {fs.unlinkSync(`sequelize-config-temp.json`) }
}

async function mysqlMigrate() {
  return new Promise<void>((resolve, reject) => {
    const execution: any = terminal.spawn(`sequelize`, [`db:migrate`], {
      stdio: "inherit",
      env: {
        NODE_ENV: options.env,
      },
      shell: true
    })
      
      execution.on("data", (data: any) => console.log(data));
      execution.on("error", (e: any) => reject(e))
      execution.on("exit", () => resolve())
  })
}

async function mysqlMigreateRefresh() {
  return new Promise<void>((resolve, reject) => {
    const execution: any = terminal.spawn(`sequelize`, [`db:migrate:undo:all`], {
      stdio: "inherit",
      env: {
        NODE_ENV: options.env,
      },
      shell: true
    })
        
    execution.on("data", (data: any) => console.log(data));
    execution.on("error", (e: any) => reject(e))
    execution.on("exit", () => resolve())
  })
}

(async () => {

  if (!options.env) { throw new Error("--env not tell") } else {
    const environment: any = environmentBy(options.env)
    await generateConfigJSON(options.env, environment)
    try {
      if (options.refresh) { 
        await mysqlMigreateRefresh() 
      }
      await mysqlMigrate()
      await removeConfigJSON()
    } catch (e) {
      await removeConfigJSON()
      throw e
    }
  }

})()
