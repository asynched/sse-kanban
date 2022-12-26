import { LoaderFunction, useLoaderData, useNavigate } from 'react-router-dom'
import { editCard, getCard } from '@/services/api/cards'
import { preventDefault } from '@/utils/ui'
import { useForm } from '@/hooks/common'
import Page from '@/layouts/Page'

export const editCardLoader: LoaderFunction = async ({ params }) => {
  const card = await getCard(params.id!, params.cardId!)

  return {
    card,
    boardId: params.id!,
  }
}

type PageProps = {
  card: Card
  boardId: number
}

export default function EditCard() {
  const navigate = useNavigate()
  const { card, boardId } = useLoaderData() as PageProps
  const [form, register] = useForm({
    title: card.title,
    group: card.group,
    description: card.description,
  })

  const handleEditCard = () => {
    editCard(boardId, card.id, form)
      .then(() => navigate(`/boards/${boardId}`))
      .catch((error) => alert(error.message))
  }

  return (
    <Page>
      <h1 className="text-4xl title">Edit card</h1>
      <p className="mb-8 tracking-tight">Edit your card with the form below</p>
      <form onSubmit={preventDefault(handleEditCard)}>
        <div className="mb-4 grid grid-cols-2 gap-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="py-2 px-4 bg-zinc-900 border border-zinc-800 outline-none rounded-lg transition ease-in-out focus:ring-2 focus:ring-purple-600"
            {...register('title')}
          />
          <select
            name="group"
            className="py-2 px-4 bg-zinc-900 border border-zinc-800 outline-none rounded-lg transition ease-in-out focus:ring-2 focus:ring-purple-600"
            {...register('group')}
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
          {...register('description')}
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
