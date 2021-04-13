import {NextFunction, Request, Response} from 'express'
import Users from '../../entities/Users'

export const checkExistingEmail = async function(req: any, res: Response, next: NextFunction){
    Users.findOne({
        where: {
            usr_email: req.body.email
        }
    }).then((user: any) => {
        if(user){
            res.status(400).send({
            error: true,
            type: "InvalidRequest",
            errors: {
                email: {
                    path: "email",
                    shortMessage: "This e-mail already exists, try with other e-mail!",
                    longMessage: "This e-mail already exists, try with other e-mail",
                    label: "email",
                    type: "email.invalid",
                    key: "email"
                },
            }
        })
            return
        }

        next()
    })
}
