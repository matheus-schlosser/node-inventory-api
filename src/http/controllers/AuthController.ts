import bcrypt from 'bcryptjs'
import Users from '../../entities/Users'
import { Request, Response} from 'express'
import {withMiddlewares} from "../../helper/withMiddlewares"
import { loginValidator, registerValidator } from '../validators/authValidator'
import { CreateUserAuthToken } from '../../helper/CreateUserAuthToken'
import { CreateMessage } from '../../helper/CreateErrorMessage'
import { checkExistingEmail } from '../middlewares/VerifyExistingUser'

export default class AuthUserController {

    public static register = withMiddlewares(
        registerValidator,
        checkExistingEmail,
        async (req: any, res: Response) => {
            await Users.create({
                usr_name: req.body.name,
                usr_email: req.body.email,
                usr_password: bcrypt.hashSync(req.body.password, 8)

            }).then((user: any) => {
                const payload = {id: user.usr_id, name: user.usr_name}
                CreateUserAuthToken.createAuthToken(req, res, payload)
                res.status(200).send({success: true, message: 'User Created Successfully'})
            }).catch((err: string) => {
                res.status(500).send("Error While Create User-> " + err)
            })
        }
    )

    public static login = withMiddlewares(
        loginValidator,
        async (req: any, res: any) => {
            Users.findOne({
                where: {
                    usr_email: req.body.email
                }
            }).then(async (user: any) => {
                if (!user) {
                    return CreateMessage.createValidationMessage(req, res, 401, "user", "User or Password Invalids", "User or Password Invalids")
                }

                const passwordIsValid = bcrypt.compareSync(req.body.password, user.usr_password)
                if(!passwordIsValid) {
                    return CreateMessage.createValidationMessage(req, res, 401, "user", "User or Password Invalids", "User or Password Invalids")
                }
            
                const payload = {id: user.usr_id}
                const token = await CreateUserAuthToken.createAuthToken(req, res, payload)
                return res.status(200)
                    .send({
                        auth: true,
                        token
                })

            }).catch((_) => {
                CreateMessage.createValidationMessage(req, res, 401, "login", "Could not log in ", "Could not log in ")
            })
        }
    )

}