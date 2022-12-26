import { zodMiddleware } from '@/middlewares/zod.middleware'
import { prisma } from '@/shared/prisma'
import { Router } from 'express'
import {
  CreateCardDto,
  createCardSchema,
  UpdateCardDto,
  updateCardSchema,
} from '@/cards/cards.dto'
import { Observable } from '@/utils/observables'
import { Card } from '@prisma/client'
import { logger } from '@/shared/logger'

const sseMap = new Map<string, Observable<Card>>()

export const cardsRouter = Router()

cardsRouter.get('/:board/sse', async (req, res) => {
  const boardId = req.params.board

  logger.info(`SSE for board: "${boardId}"`)

  const board = await prisma.board.findUnique({
    where: {
      id: +boardId,
    },
  })

  if (!board) {
    logger.warn(`Board not found: "${boardId}"`)

    return res.status(404).json({
      message: 'Board not found',
    })
  }

  logger.info(`Board found: "${boardId}"`)
  logger.info(`Starting new SSE session for the client`)

  res.header('Content-Type', 'text/event-stream')
  res.header('Cache-Control', 'no-cache')
  res.header('Connection', 'keep-alive')

  if (!sseMap.has(boardId)) {
    logger.info(`Creating new observable for board: "${boardId}"`)
    sseMap.set(boardId, new Observable())
  }

  const observable = sseMap.get(boardId)!

  const unsubscribe = observable.subscribe(async (card) => {
    const cards = await prisma.card.findMany({
      where: {
        boardId: +boardId,
      },
    })

    res.write('event: message\n')
    res.write(`data: ${JSON.stringify(cards)}\n\n`)
  })

  const cards = await prisma.card.findMany({
    where: {
      boardId: +boardId,
    },
  })

  logger.info(`Sending initial data to the client`)

  res.write('event: message\n')
  res.write(`data: ${JSON.stringify(cards)}\n\n`)

  req.on('close', () => {
    logger.info(`Client disconnected, clearing SSE session`)

    unsubscribe()

    if (observable.subscriberCount() === 0) {
      logger.info(
        `No more subscribers, clearing observable for board: "${boardId}"`
      )
      sseMap.delete(boardId)
    }
  })
})

cardsRouter.get('/:board', async (req, res) => {
  const boardId = req.params.board

  const cards = await prisma.card.findMany({
    where: {
      boardId: +boardId,
    },
  })

  res.json(cards)
})

cardsRouter.post(
  '/:board',
  zodMiddleware(createCardSchema),
  async (req, res) => {
    const boardId = req.params.board
    const data = req.body as CreateCardDto

    const card = await prisma.card.create({
      data: {
        ...data,
        boardId: +boardId,
      },
    })

    logger.info(`Card created: "${card.id}"`)

    if (sseMap.has(boardId)) {
      logger.info(`Sending new card to the client: "${card.id}"`)
      sseMap.get(boardId)!.next(card)
    }

    return res.status(201).json({
      message: 'Card created successfully',
      data: card,
    })
  }
)

cardsRouter.get('/:board/:id', async (req, res) => {
  const id = req.params.id

  const card = await prisma.card.findUnique({
    where: {
      id: +id,
    },
  })

  if (!card) {
    return res.status(404).json({
      message: 'Card not found',
    })
  }

  return res.json(card)
})

cardsRouter.put(
  '/:board/:id',
  zodMiddleware(updateCardSchema),
  async (req, res) => {
    const boardId = req.params.board
    const id = req.params.id
    const data = req.body as UpdateCardDto

    const card = await prisma.card.update({
      where: {
        id: +id,
      },
      data,
    })

    if (!card) {
      logger.warn(`Card not found: "${id}"`)

      return res.status(404).json({
        message: 'Card not found',
      })
    }

    logger.info(`Card updated: "${card.id}"`)

    if (sseMap.has(boardId)) {
      logger.info(`Sending updated card to the client: "${card.id}"`)
      sseMap.get(boardId)!.next(card)
    }

    return res.json(card)
  }
)

cardsRouter.delete('/:board/:id', async (req, res) => {
  const id = req.params.id

  const card = await prisma.card.delete({
    where: {
      id: +id,
    },
  })

  if (!card) {
    logger.warn(`Card not found: "${id}"`)

    return res.status(404).json({
      message: 'Card not found',
    })
  }

  if (sseMap.has(req.params.board)) {
    logger.info(`Sending deleted card to the client: "${card.id}"`)
    sseMap.get(req.params.board)!.next(card)
  }

  return res.json(card)
})
