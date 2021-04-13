import { RequestHandler } from 'express'

export function withMiddlewares(...handlers: RequestHandler[]) : RequestHandler[] {
    return handlers
}