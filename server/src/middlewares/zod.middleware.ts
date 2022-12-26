import type { Handler } from 'express'
import type { ZodType } from 'zod'

export const zodMiddleware = <T>(schema: ZodType<T>): Handler => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body)

    if (result.success) {
      req.body = result.data
      return next()
    }

    res.status(400).json({
      error: result.error,
    })
  }
}
