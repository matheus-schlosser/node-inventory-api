import {NextFunction, Request, Response} from 'express'
import {environment} from "../../environment"

import jwt from 'jsonwebtoken'

export async function verifyAuthToken(req: any, res: any, next: NextFunction) {
    const authtoken: string|null = req.headers.authorization || null
    if (!authtoken){
        return res.status(401).send({
            auth: false,
            message: 'No token provided',
        })
    }
    jwt.verify(authtoken, environment.JWT_SECRET, async (err: any, decoded: any) => {
        if (err){
            return res.status(401).send({
                auth: false,
                message: 'Unauthorized',
            })
        }
        req.userId = decoded.id
        next()
    })
}

export const authJwt = {}
