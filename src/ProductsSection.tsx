import { useLoaderData } from 'react-router-dom';
import { Product } from './pages/ProductPage';
import ProductCard from './ProductCard';
import supabase from './supabase';

export async function getProducts() {
  const { data, error } = await supabase.from('products').select('*');
  if (error) throw new Error('Could not fetch the products');
  return data;
}

function ProductsSection() {
  const products = useLoaderData() as Awaited<ReturnType<typeof getProducts>>; // router has an issue here, temporary solution;
  return (
    <section className="grid gap-5 px-2 py-7 md:grid-cols-2 lg:grid-cols-1">
      {products.map((product: Product) => {
        return <ProductCard key={product.id} props={product} />;
      })}
    </section>
  );
}

export default ProductsSection;
