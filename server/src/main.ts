import express, { json } from 'express'
import cors from 'cors'

import { logger } from '@/shared/logger'
import { boardsRouter } from '@/boards/boards.controller'
import { cardsRouter } from '@/cards/cards.controller'
import { loggerMiddleware } from '@/middlewares/logger.middleware'

const app = express()

app.use(json())
app.use(cors())
app.use(loggerMiddleware())

app.use('/boards', boardsRouter)
app.use('/cards', cardsRouter)

app.listen(3000, () => logger.info('Server started on port :3000'))
