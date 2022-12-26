import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { preventDefault } from '@/utils/ui'
import { createBoard } from '@/services/api/boards'
import Page from '@/layouts/Page'

export default function CreateBoard() {
  const navigate = useNavigate()
  const formRef = useRef<HTMLFormElement>(null)

  const handleCreateBoard = () => {
    const formData = new FormData(formRef.current!)

    createBoard({
      name: formData.get('name') as string,
      description: formData.get('description') as string,
    })
      .then(() => navigate('/'))
      .catch((error) => alert(error.message))
  }

  return (
    <Page>
      <h1 className="title text-4xl">Create board</h1>
      <p className="tracking-tight mb-8">Create your board here</p>
      <form
        className="flex flex-col"
        onSubmit={preventDefault(handleCreateBoard)}
        ref={formRef}
      >
        <div className="mb-8 grid grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="bg-zinc-900 py-2 px-4 border border-zinc-800 rounded-lg outline-none focus:ring-2 focus:ring-purple-600 transition ease-in-out"
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            className="bg-zinc-900 py-2 px-4 border border-zinc-800 rounded-lg outline-none focus:ring-2 focus:ring-purple-600 transition ease-in-out"
          />
        </div>
        <button
          className="bg-gradient-to-br from-purple-600 to-pink-600 py-2 rounded-lg tracking-tight text-white transition hover:brightness-110"
          type="submit"
        >
          Create
        </button>
      </form>
    </Page>
  )
}
