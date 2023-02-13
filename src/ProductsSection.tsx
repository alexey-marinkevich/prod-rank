import ProductCard from './ProductCard';

function ProductsSection() {
  return (
    <section className="grid gap-5 px-2 py-7 md:grid-cols-2">
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </section>
  );
}

export default ProductsSection;
