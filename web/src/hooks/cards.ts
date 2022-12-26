import { API_URL } from '@/config/env'
import { useEffect, useState } from 'react'

export const useRealtimeCards = (boardId: number) => {
  const [cards, setCards] = useState([] as Card[])

  useEffect(() => {
    const source = new EventSource(`${API_URL}/cards/${boardId}/sse`)

    source.addEventListener('message', (event) => {
      const cards = JSON.parse(event.data) as Card[]

      setCards(cards)
    })

    return () => {
      source.close()
    }
  }, [boardId])

  return cards
}
