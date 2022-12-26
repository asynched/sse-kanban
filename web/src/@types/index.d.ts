declare type Board = {
  id: number
  name: string
  description: string
  createdAt: string
  updatedAt: string
}

type Group = 'TODO' | 'DOING' | 'DONE'

declare type Card = {
  id: number
  title: string
  description: string
  group: Group
  boardId: number
  createdAt: string
  updatedAt: string
}

type Id = number | string
