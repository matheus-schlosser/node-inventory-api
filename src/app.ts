import * as dotenv from 'dotenv'
dotenv.config()

console.log(`START PROCESS ON ${process.env.NODE_ENV || 'undefined'} MODE`);

if(!process.env.NODE_ENV){
  throw new Error('Application mode undefined')
}
import express from 'express'
import helmet from 'helmet'
import {routes} from "./routes/routes"

const app = express()

app.use(helmet())
app.use(routes)

app.use((err: any, req: any, res: any, next: any) => res.status(400).json(err))

export default app
