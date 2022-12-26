import { useLoaderData, Link } from 'react-router-dom'

import { getBoards } from '@/services/api/boards'

import Show from '@/components/utils/Show'
import { PlusIcon } from '@heroicons/react/24/outline'
import Page from '@/layouts/Page'

type PageProps = Board[]

export const boardsLoader = async () => {
  return await getBoards()
}

export default function Boards() {
  const boards = useLoaderData() as PageProps

  return (
    <Page>
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="mb-2 text-4xl title">Kanban</h1>
          <p className="tracking-tight">See your boards here</p>
        </div>
        <Link
          className="p-2 bg-zinc-900 border border-zinc-800 rounded-lg"
          to="/boards/create"
          title="Create a new board"
        >
          <PlusIcon className="w-5 h-5" />
        </Link>
      </div>
      <section>
        <h2 className="mb-4 text-3xl title">Boards</h2>
        <Show
          when={boards.length > 0}
          fallback={
            <div className="p-4 border-2 border-zinc-900 border-dashed rounded-lg text-center">
              No board was found
            </div>
          }
        >
          <ul className="grid grid-cols-4 gap-4">
            {boards.map((board) => (
              <li
                className="bg-zinc-900 border border-zinc-800 p-4 rounded-lg"
                key={board.id}
              >
                <Link
                  className="block mb-1 text-xl text-white font-bold tracking-tighter"
                  to={`/boards/${board.id}`}
                >
                  {board.name}
                </Link>
                <p>{board.description}</p>
              </li>
            ))}
          </ul>
        </Show>
      </section>
    </Page>
  )
}
