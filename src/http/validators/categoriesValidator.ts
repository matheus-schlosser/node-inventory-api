import Joi from 'joi'
import {validate} from "../../helper/validate"

export const createCategoryValidator = validate.handler(() => {
    const schema: object = {
        cat_name: Joi.string().required(),
        cat_image: Joi.string().required()
    }

    return { schema }
})

export const editCategoryValidator = validate.handler(() => {
    const schema: object = {
        cat_name: Joi.string().required(),
        cat_image: Joi.string().required(),        
    }

    return { schema }
})
