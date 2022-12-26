import { Link } from 'react-router-dom'

type PageProps = {
  children: React.ReactNode
}

export default function Page({ children }: PageProps) {
  return (
    <>
      <header className="border-b border-zinc-900 py-4">
        <div className="max-w-screen-lg mx-auto flex items-center justify-between">
          <Link to="/" className="text-2xl title">
            KanBoard
          </Link>
          <div className="flex gap-2">
            <Link className="tracking-tight" to="/">
              Boards
            </Link>
            <Link className="tracking-tight" to="/boards/create">
              Create
            </Link>
          </div>
        </div>
      </header>
      <main className="max-w-screen-lg mx-auto py-8">{children}</main>
    </>
  )
}
