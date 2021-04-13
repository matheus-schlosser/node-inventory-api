import {Request, Response} from 'express'

export class CreateMessage {

  public static async createValidationMessage(req: any, res: Response, status: number, path: string, shortMessage: string, longMessage: string, label?: string, type?: string, key?: string, extraParam?: object){
    res.status(status).send({
      error: true,
      type: "InvalidRequest",
      errors: {
        [path]: {
          path,
          shortMessage,
          longMessage,
          label,
          type,
          key, 
          ...extraParam
        }  
      }
    })
  }

  public static async createErrorMessage(req: any, res: Response, status: number, message: string,  extraParam?: object){
    res.status(status).send({
      error: true,
      message,
      ...extraParam
    })
  }

  public static async createServerErrorMessage(req: any, res: Response, err: any, message: string,  extraParam?: object){
    console.log(err)
    console.error(message, req.body)
    res.status(500).send({ success: false, message })
  }

  public static async createMessage(req: any, res: Response, status: number, message: string){
    res.status(status).send({
      success: true,
      message
    })
  }

}
