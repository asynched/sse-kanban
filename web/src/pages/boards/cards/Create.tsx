import { useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { preventDefault } from '@/utils/ui'
import { createCard } from '@/services/api/cards'
import Page from '@/layouts/Page'

type PageParams = {
  id: string
}

export default function CreateCard() {
  const params = useParams() as PageParams
  const navigate = useNavigate()
  const formRef = useRef<HTMLFormElement>(null)

  const handleCreateCard = () => {
    const data = new FormData(formRef.current!)

    createCard(params.id, {
      title: data.get('title') as string,
      description: data.get('description') as string,
      group: data.get('group') as Group,
    })
      .then(() => navigate(`/boards/${params.id}`))
      .catch((error) => alert(error.message))
  }

  return (
    <Page>
      <h1 className="text-4xl title">Create card</h1>
      <p className="mb-8 tracking-tight">
        Create a new card filling the form bellow
      </p>
      <form onSubmit={preventDefault(handleCreateCard)} ref={formRef}>
        <div className="mb-4 grid grid-cols-2 gap-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="py-2 px-4 bg-zinc-900 border border-zinc-800 outline-none rounded-lg transition ease-in-out focus:ring-2 focus:ring-purple-600"
          />
          <select
            name="group"
            className="py-2 px-4 bg-zinc-900 border border-zinc-800 outline-none rounded-lg transition ease-in-out focus:ring-2 focus:ring-purple-600"
          >
            <option value="TODO">To do</option>
            <option value="DOING">Doing</option>
            <option value="DONE">Done</option>
          </select>
        </div>
        <textarea
          name="description"
          placeholder="Description"
          className="mb-4 p-4 block w-full h-24 bg-zinc-900 border border-zinc-800 outline-none rounded-lg transition ease-in-out focus:ring-2 focus:ring-purple-600 resize-none"
        ></textarea>
        <button
          className="bg-gradient-to-br from-purple-600 to-pink-600 block w-full py-2 px-4 text-white rounded-lg transition ease-in-out hover:brightness-110"
          type="submit"
        >
          Create
        </button>
      </form>
    </Page>
  )
}
