import { API_URL } from '@/config/env'

export const getCards = async (boardId: number) => {
  const response = await fetch(`${API_URL}/cards/${boardId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch cards')
  }

  const data = await response.json()

  return data as Card[]
}

export const getCard = async (boardId: Id, cardId: Id) => {
  const response = await fetch(`${API_URL}/cards/${boardId}/${cardId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch card')
  }

  const data = await response.json()

  return data as Card
}

type CreateCardDto = {
  title: string
  description: string
  group: Group
}

export const createCard = async (boardId: Id, data: CreateCardDto) => {
  const response = await fetch(`${API_URL}/cards/${boardId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Failed to create card')
  }
}

type EditCardDto = CreateCardDto

export const editCard = async (boardId: Id, cardId: Id, data: EditCardDto) => {
  const response = await fetch(`${API_URL}/cards/${boardId}/${cardId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Failed to edit card')
  }
}

export const deleteCard = async (boardId: Id, cardId: Id) => {
  const response = await fetch(`${API_URL}/cards/${boardId}/${cardId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error('Failed to delete card')
  }
}
