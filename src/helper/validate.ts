import {Validator} from "express-validation-request"
import {VALIDATION_DEFAULT_MESSAGES} from "./validation_default_messages"

const validate = new Validator()

validate.useDefaultProviderMessage(VALIDATION_DEFAULT_MESSAGES)
export {
    validate
}