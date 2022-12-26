import React, { useMemo } from 'react'
import {
  useLoaderData,
  Link,
  LoaderFunction,
  useNavigate,
} from 'react-router-dom'
import { useRealtimeCards } from '@/hooks/cards'
import { getBoard, deleteBoard } from '@/services/api/boards'
import { deleteCard } from '@/services/api/cards'

import { PlusIcon, TrashIcon, PencilIcon } from '@heroicons/react/24/outline'
import Show from '@/components/utils/Show'
import Page from '@/layouts/Page'

type PageProps = Board

const groupCards = (cards: Card[]) => {
  type Groups = 'todo' | 'doing' | 'done'

  const groups: Record<Groups, Card[]> = {
    todo: [],
    doing: [],
    done: [],
  }

  cards.forEach((card) => {
    groups[card.group.toLowerCase() as Groups].push(card)
  })

  return groups
}

export const boardLoader: LoaderFunction = async ({ params }) => {
  return await getBoard(params.id!)
}

export default function Board() {
  const board = useLoaderData() as PageProps
  const navigate = useNavigate()
  const cards = useRealtimeCards(board.id)
  const groups = useMemo(() => groupCards(cards), [cards])

  const handleDeleteBoard = () => {
    deleteBoard(board.id)
      .then(() => navigate('/'))
      .catch((error) => alert(error.message))
  }

  return (
    <Page>
      <div className="mb-8 flex justify-between">
        <div>
          <h1 className="text-4xl title">{board.name}</h1>
          <p className="mb-2 tracking-tight">{board.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            className="p-2 border border-zinc-800 bg-zinc-900 rounded-lg"
            to={`/boards/${board.id}/cards/create`}
          >
            <PlusIcon className="w-4 h-4" />
          </Link>
          <button
            className="p-2 border border-zinc-800 bg-zinc-900 rounded-lg"
            onClick={handleDeleteBoard}
          >
            <TrashIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div>
        <Show
          when={cards.length > 0}
          fallback={
            <div className="p-4 border-2 border-dashed border-zinc-900 text-center rounded-lg">
              This board has no cards
            </div>
          }
        >
          <div className="grid grid-cols-3 gap-8">
            <CardSection boardId={board.id} title="Todo" cards={groups.todo} />
            <CardSection
              boardId={board.id}
              title="Doing"
              cards={groups.doing}
            />
            <CardSection boardId={board.id} title="Done" cards={groups.done} />
          </div>
        </Show>
      </div>
    </Page>
  )
}

type CardSectionProps = {
  boardId: Id
  title: string
  cards: Card[]
}

const CardSection: React.FC<CardSectionProps> = ({ boardId, title, cards }) => {
  return (
    <section>
      <h2 className="mb-4 text-3xl title">{title}</h2>
      <Show
        when={cards.length > 0}
        fallback={
          <div className="px-4 py-8 border-2 border-zinc-900 rounded-lg border-dashed text-center">
            No cards available for this group
          </div>
        }
      >
        <ul className="grid gap-4">
          {cards.map((card) => (
            <CardItem boardId={boardId} key={card.id} card={card} />
          ))}
        </ul>
      </Show>
    </section>
  )
}

type CardItemProps = {
  card: Card
  boardId: Id
}

const CardItem: React.FC<CardItemProps> = ({ card, boardId }) => {
  const handleDeleteCard = () => {
    deleteCard(boardId, card.id).catch(() => alert('Could not delete card'))
  }

  return (
    <li className="p-4 border border-zinc-800 bg-zinc-900 rounded-lg">
      <Link to={`/boards/${boardId}/cards/edit/${card.id}`}>
        <h3 className="text-xl tracking-tighter font-bold text-zinc-200">
          {card.title}
        </h3>
      </Link>
      <p className="mb-2 tracking-tight">{card.description}</p>
      <div className="flex gap-2 justify-end">
        <Link to={`/boards/${boardId}/cards/edit/${card.id}`}>
          <button className="p-2 border border-zinc-800 rounded-lg">
            <PencilIcon className="w-4 h-4" />
          </button>
        </Link>
        <button
          className="p-2 border border-zinc-800 rounded-lg"
          onClick={handleDeleteCard}
        >
          <TrashIcon className="w-4 h-4" />
        </button>
      </div>
    </li>
  )
}
