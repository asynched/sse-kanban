import { Router } from 'express'
import { prisma } from '@/shared/prisma'
import { logger } from '@/shared/logger'
import {
  createBoardSchema,
  CreateBoardDto,
  updateBoardSchema,
  UpdateBoardDto,
} from '@/boards/boards.dto'
import { zodMiddleware } from '@/middlewares/zod.middleware'

export const boardsRouter = Router()

boardsRouter.get('/', async (req, res) => {
  const boards = await prisma.board.findMany()

  res.json(boards)
})

boardsRouter.post('/', zodMiddleware(createBoardSchema), async (req, res) => {
  const data = req.body as CreateBoardDto

  logger.info(`Creating board: "${data.name}"`)

  const board = await prisma.board.create({
    data,
  })

  logger.info('Board created successfully')

  return res.status(201).json(board)
})

boardsRouter.get('/:id', async (req, res) => {
  const id = req.params.id

  const board = await prisma.board.findUnique({
    where: {
      id: +id,
    },
  })

  if (!board) {
    return res.status(404).json({
      message: 'Board not found',
    })
  }

  return res.json(board)
})

boardsRouter.put('/:id', zodMiddleware(updateBoardSchema), async (req, res) => {
  const data = req.body as UpdateBoardDto

  const id = req.params.id as string

  logger.info(`Updating board: "${id}"`)

  const board = await prisma.board.update({
    where: {
      id: +id,
    },
    data,
  })

  if (!board) {
    logger.warn(`Board not found "${id}"`)

    return res.status(404).json({
      message: 'Board not found',
    })
  }

  logger.info(`Board updated successfully: "${board.name}"`)

  return res.json({
    message: 'Board updated successfully',
    data: board,
  })
})

boardsRouter.delete('/:id', async (req, res) => {
  const id = req.params.id as string

  logger.info(`Deleting board: "${id}"`)

  const board = await prisma.board.delete({
    where: {
      id: +id,
    },
  })

  if (!board) {
    logger.warn(`Board not found "${id}"`)

    return res.status(404).json({
      message: 'Board not found',
    })
  }

  logger.info(`Board deleted successfully: "${board.name}"`)

  return res.status(204).json({})
})
