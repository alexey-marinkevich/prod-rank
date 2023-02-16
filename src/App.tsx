import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage, ErrorPage, SuggestProductPage, ProductPage } from './pages';

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
  {
    path: '/product/:id',
    element: <ProductPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
