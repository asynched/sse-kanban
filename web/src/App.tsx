import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Boards, { boardsLoader } from '@/pages/Boards'
import Board, { boardLoader } from '@/pages/boards'
import CreateBoard from '@/pages/boards/Create'
import CreateCard from '@/pages/boards/cards/Create'
import EditCard, { editCardLoader } from '@/pages/boards/cards/Edit'

const router = createBrowserRouter([
  {
    path: '/',
    loader: boardsLoader,
    element: <Boards />,
  },
  {
    path: '/boards/create',
    element: <CreateBoard />,
  },
  {
    path: '/boards/:id',
    loader: boardLoader,
    element: <Board />,
  },
  {
    path: '/boards/:id/cards/create',
    element: <CreateCard />,
  },
  {
    path: '/boards/:id/cards/edit/:cardId',
    element: <EditCard />,
    loader: editCardLoader,
  },
  {
    path: '*',
    element: (
      <div>
        <h1>Page not found</h1>
        <p>Perhaps a wrong link?</p>
      </div>
    ),
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
