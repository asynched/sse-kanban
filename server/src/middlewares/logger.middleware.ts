import { logger } from '@/shared/logger'
import { Handler } from 'express'

export const loggerMiddleware = (): Handler => {
  return (req, res, next) => {
    const start = Date.now()
    const { method, url } = req
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress

    logger.info(`${method} ${url} ${ip}`)

    res.on('finish', () => {
      const duration = Date.now() - start
      const { statusCode } = res

      if (statusCode < 400) {
        logger.info(`${method} ${url} ${ip} ${statusCode} (${duration}ms)`)
      } else {
        logger.warn(`${method} ${url} ${ip} ${statusCode} (${duration}ms)`)
      }
    })

    next()
  }
}
