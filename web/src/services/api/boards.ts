import { API_URL } from '@/config/env'

export const getBoards = async () => {
  const response = await fetch(`${API_URL}/boards`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch boards')
  }

  const data = await response.json()

  return data as Board[]
}

export const getBoard = async (id: Id) => {
  const response = await fetch(`${API_URL}/boards/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch board')
  }

  const data = await response.json()

  return data as Board
}

type CreateBoardDto = {
  name: string
  description: string
}

export const createBoard = async (data: CreateBoardDto) => {
  const response = await fetch(`${API_URL}/boards`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Failed to create board')
  }
}

export const deleteBoard = async (id: Id) => {
  const response = await fetch(`${API_URL}/boards/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error('Failed to delete board')
  }
}
