import Joi from 'joi'
import {validate} from "../../helper/validate"

export const createOrderValidator = validate.handler(()  => {
    const schema: any = {
        ord_cl_id: Joi.number().required(),
        ord_pdt_id: Joi.number().required(),
        ord_quantity: Joi.number().required(),
        ord_description: Joi.string().required(),        
        ord_status: Joi.boolean().required()
    }

    return { schema }
})

export const editOrderValidator = validate.handler(()  => {
    const schema: any = {
        ord_cl_id: Joi.number().required(),
        ord_pdt_id: Joi.number().required(),
        ord_quantity: Joi.number().required(),
        ord_description: Joi.string().required(),        
        ord_status: Joi.boolean().required()
    }

    return { schema }
})