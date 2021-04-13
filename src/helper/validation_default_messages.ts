export const VALIDATION_DEFAULT_MESSAGES = {
    "any.required": (err: any) => ({
        shortMessage: 'Required Field',
        longMessage: `The field ${err.label || err.path.join('.')} is required`
    }),
    "any.empty": (err: any) => ({
        shortMessage: 'Required Field',
        longMessage: `The field ${err.label || err.path.join('.')} is required`
    }),
    "any.allowOnly": (err: any) => ({
        shortMessage: 'Any option was selected',
        longMessage: `The field ${err.label || err.path.join('.')} allow only the values: "${err.context.valids.join('","')}"`
    }),
    "string.base": (err: any) => ({
        shortMessage: 'Required Field',
        longMessage: `The field ${err.label || err.path.join('.')} has an invalid value`
    }),
    "string.email": (err: any) => ({
        shortMessage: 'Invalid E-mail',
        longMessage: `The field ${err.label || err.path.join('.')} should has an valid e-mail`
    }),
    "array.base": (err: any) => ({
        shortMessage: 'Invalid Value',
        longMessage: `The field ${err.label || err.path.join('.')} has an invalid Value`
    }),
    "number.base": (err: any) => ({
        shortMessage: 'Invalid Value',
        longMessage: `The field ${err.label || err.path.join('.')} has an invalid Value`
    }),
    "date.base": (err: any) => ({
        shortMessage: 'Invalid Value',
        longMessage: `The field ${err.label || err.path.join('.')} has an invalid Value`
    }),
    "boolean.base": (err: any) => ({
        shortMessage: 'Invalid Value',
        longMessage: `The field ${err.label || err.path.join('.')} has an invalid Value`
    }),
    "string.min": (err: any) => ({
        shortMessage: 'Should has at least '+err.context.limit+' characters',
        longMessage: `The field ${err.label || err.path.join('.')} allows at least: "${err.context.limit} characters"`
    }),
    "string.max": (err: any) => ({
        shortMessage: 'Should has at most '+err.context.limit+' characters',
        longMessage: `The field ${err.label || err.path.join('.')} allows a maximum of: "${err.context.limit} characters"`
    }),
    "array.min": (err: any) => ({
        shortMessage: 'Necessary at least one info',
        longMessage: `The field ${err.label || err.path.join('.')} should has at least one value`
    }),
    "date.greater": (err: any) => ({
        shortMessage: 'Invalid Date',
        longMessage: `The field ${err.label || err.path.join('.')} has an invalid Value`
    }),
    "date.max": (err: any) => ({
        shortMessage: 'Invalid Date',
        longMessage: `The field ${err.label || err.path.join('.')} has an invalid Value`
    }),
    "date.isoDate": (err: any) => ({
        shortMessage: 'Invalid Date',
        longMessage: `The field ${err.label || err.path.join('.')} has an invalid Value`
    }),
    "date.min": (err: any) => ({
        shortMessage: 'Invalid Date',
        longMessage: `The field ${err.label || err.path.join('.')} has an invalid date`
    }),
    "number.min": (err: any) => ({
        shortMessage: 'Should has at least '+err.context.limit+' characters',
        longMessage: `The field ${err.label || err.path.join('.')} allow at most: "${err.context.limit} characters"`
    }),
    "number.max": (err: any) => ({
        shortMessage: 'Should has at most '+err.context.limit+' characters',
        longMessage: `The field ${err.label || err.path.join('.')} allow at most: "${err.context.limit} characters"`
    }),
}