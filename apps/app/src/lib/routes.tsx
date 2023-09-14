import Carpooling from '@/components/pages/carpooling';
import Help from '@/components/pages/help';
import Home from '@/components/pages/home';
import Map from '@/components/pages/map';
import Layout from '@/components/templates/layout';
import { RouteObject } from 'react-router-dom';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/map', element: <Map /> },
      { path: '/carpooling', element: <Carpooling /> },
      { path: '/help', element: <Help /> }
    ]
  }
];

export default routes;
