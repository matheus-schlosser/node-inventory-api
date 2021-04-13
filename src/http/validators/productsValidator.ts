import Joi from 'joi'
import {validate} from "../../helper/validate"

export const createProductValidator = validate.handler(()  => {
    const schema: object = {
        pdt_name: Joi.string().required(),
        pdt_cat_id: Joi.number().required(),
        pdt_image: Joi.string().required(),
        pdt_price: Joi.string().required()      
    }
    return { schema }
})

export const editProductValidator = validate.handler(()  => {
    const schema: object = {
        pdt_cat_id: Joi.number().required(),
        pdt_name: Joi.string().required(),
        pdt_image: Joi.string().required(),      
        pdt_price: Joi.string().required()     
    }
    return { schema }
})