import { useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { Params, useLoaderData, useNavigate, useNavigation } from 'react-router-dom';
import { PageLoader, ProductCard } from '../components';
import { Product } from '../pages/ProductPage';
import supabase from '../supabase';

export const productsPerPage = 6;

export async function productsLoader({ params }: { params: Params }) {
  const page = Number(params.page);
  const fromItem = page * productsPerPage;
  const toItem = fromItem + productsPerPage - 1;

  const { data, error, count } = await supabase
    .from('products')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(fromItem, toItem);
  if (error) throw new Error('Could not fetch the products');

  return {
    products: data,
    count,
    page,
  };
}

function ProductsSection() {
  const { products, count, page } = useLoaderData() as Awaited<
    ReturnType<typeof productsLoader>
  >;
  const navigate = useNavigate();
  const navigation = useNavigation();
  const pagesCount: number = Math.ceil(Number(count) / productsPerPage);

  useEffect(() => {
    const prodSection = document.getElementById('products-section');
    const navBar = document.getElementById('nav-bar');

    const prodSectionScroll = () => {
      if (prodSection && navBar) {
        if (prodSection.scrollTop < 15) {
          navBar.style.transform = 'translateY(0)';
        }
        if (prodSection?.scrollTop > 500) {
          navBar.style.transform = 'translateY(-20rem)';
        }
      }

      window.scrollTo(0, 0);
    };
    prodSection?.addEventListener('scroll', prodSectionScroll);
    prodSection?.addEventListener('resize', prodSectionScroll);

    return () => {
      prodSection?.removeEventListener('scroll', prodSectionScroll);
      prodSection?.removeEventListener('resize', prodSectionScroll);
    };
  }, []);

  function handleChangePage({ selected }: { selected: number }) {
    navigate(`/${selected}`);
    window.scrollTo({
      top: 0,
    });
  }

  return (
    <>
      {navigation.state === 'loading' ? (
        <PageLoader />
      ) : (
        <section
          id="products-section"
          className="m-auto grid h-[100vh]  max-w-7xl snap-y snap-mandatory gap-5
          overflow-scroll px-2 py-7 md:h-auto md:snap-none md:grid-cols-2
           md:overflow-auto lg:grid-cols-1"
        >
          {products.map((product: Product) => {
            return <ProductCard key={product.id} props={product} />;
          })}
        </section>
      )}

      <ReactPaginate
        pageCount={pagesCount}
        forcePage={page}
        pageRangeDisplayed={3}
        marginPagesDisplayed={0}
        onPageChange={handleChangePage}
        containerClassName="m-auto grid gap-6 justify-items-center justify-center items-center p-10 sm:grid-flow-col sm:gap-1"
        pageLinkClassName="rounded-lg bg-transparent py-3 px-5 text-lg text-neutral-600 transition-all duration-300 hover:bg-neutral-100"
        activeLinkClassName="pointer-events-none rounded-lg bg-neutral-900 py-3 px-5 text-lg font-medium text-neutral-100 transition-all duration-300"
        previousLinkClassName="rounded-lg bg-transparent py-3 px-5 text-lg text-neutral-900 transition-all duration-300 hover:bg-neutral-100"
        nextLinkClassName="rounded-lg bg-transparent py-3 px-5 text-lg text-neutral-900 transition-all duration-300 hover:bg-neutral-100"
        disabledClassName="pointer-events-none rounded-lg bg-transparent py-3 px-5 text-lg transition-all duration-300"
        disabledLinkClassName="text-neutral-300"
        breakClassName="hidden"
      />
    </>
  );
}

export default ProductsSection;
