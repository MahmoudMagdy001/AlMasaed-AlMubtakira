import type { RouteObject } from 'react-router-dom'
import { PublicLayout } from './app/layouts/PublicLayout'
import { HomePage } from './features/home/HomePage'
import { NotFoundPage } from './features/home/NotFoundPage'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]
