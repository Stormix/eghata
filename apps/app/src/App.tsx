import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import LoadingSpinner from './components/atoms/loading-spinner';
import routes from './lib/routes';

const router = createBrowserRouter(routes);

const App = () => {
  return <RouterProvider router={router} fallbackElement={<LoadingSpinner />} />;
};

export default App;
