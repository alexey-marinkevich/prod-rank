import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import {
  HomePage,
  ErrorPage,
  SuggestProductPage,
  suggestProductAction,
  ProductPage,
  productLoader,
} from './pages';
import { ProductsSection, productsLoader } from './components';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorPage />}>
      <Route path="/" element={<HomePage />}>
        <Route path="/:page" element={<ProductsSection />} loader={productsLoader} />
      </Route>
      <Route
        path="/suggest"
        element={<SuggestProductPage />}
        action={suggestProductAction}
      />
      <Route path="/product/:id" element={<ProductPage />} loader={productLoader} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
