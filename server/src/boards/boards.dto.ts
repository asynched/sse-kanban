import { z } from 'zod'

export const createBoardSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().min(1).max(255),
})

export type CreateBoardDto = z.infer<typeof createBoardSchema>

export const updateBoardSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().min(1).max(255),
})

export type UpdateBoardDto = z.infer<typeof updateBoardSchema>
