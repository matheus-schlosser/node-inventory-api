import Joi from 'joi'
import {validate} from "../../helper/validate"

export const registerValidator = validate.handler(() => {
    const schema: object = {
        name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required()
    }

    return { schema }
})

export const loginValidator = validate.handler(() => {
    const schema: object = {
        email: Joi.string().required(),
        password: Joi.string().required()  
    }

    return { schema }
})
