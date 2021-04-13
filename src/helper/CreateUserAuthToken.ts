import {Request, Response} from 'express'
import jwt from "jsonwebtoken"
import { environment } from '../environment'

export class CreateUserAuthToken {

  public static async createAuthToken(req: any, res: Response, data: any){
    const token = {
      id: data.id,
      name: data.name,
    }
    const authorizationToken = jwt.sign(
      token,
      environment.JWT_SECRET, {
          expiresIn: '1h'
      }
    )
    
    return authorizationToken
  }
}
