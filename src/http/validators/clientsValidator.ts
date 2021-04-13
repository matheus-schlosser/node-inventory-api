import Joi from 'joi'
import {validate} from "../../helper/validate"

export const createClientValidator = validate.handler(()  => {
    const schema: object = {
        cl_name: Joi.string().required(),        
        cl_responsible: Joi.string().required(),
        cl_phone: Joi.string().required(),
        cl_active: Joi.boolean().required()
    }
    return { schema }
})

export const editClientValidator = validate.handler(()  => {
    const schema: object = {
        cl_name: Joi.string().required(),        
        cl_responsible: Joi.string().required(),
        cl_phone: Joi.string().required(),
        cl_active: Joi.boolean().required()
    }
    return { schema }
})
