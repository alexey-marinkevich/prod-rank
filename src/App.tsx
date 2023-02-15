import HomePage from './pages/HomePage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ErrorPage, SuggestProductPage } from './pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/suggest',
    element: <SuggestProductPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
