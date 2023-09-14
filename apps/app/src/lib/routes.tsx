import Home from '@/components/pages/home'
import Layout from '@/components/templates/layout'
import { RouteObject } from 'react-router-dom'

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
    ]
  },
 
]

export default routes