import { z } from 'zod'

const cardGroupSchema = z.union([
  z.literal('TODO'),
  z.literal('DOING'),
  z.literal('DONE'),
])

export const createCardSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1).max(255),
  group: cardGroupSchema,
})

export type CreateCardDto = z.infer<typeof createCardSchema>

export const updateCardSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1).max(255),
  group: cardGroupSchema,
})

export type UpdateCardDto = z.infer<typeof updateCardSchema>
