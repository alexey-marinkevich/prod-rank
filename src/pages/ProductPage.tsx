import { type Params, useLoaderData, useNavigate, useNavigation } from 'react-router-dom';
import supabase from '../supabase';

import { GoGlobe } from 'react-icons/go';
import { IoIosArrowRoundBack, IoIosArrowDown } from 'react-icons/io';
// import { BsFillArrowUpSquareFill } from 'react-icons/bs';

import { PageLoader } from '../components';
import { productsPerPage } from '../components/ProductsSection';

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

export async function productLoader({ params }: { params: Params }) {
  const { id } = params;

  const { data: item, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  const { count } = await supabase
    .from('products')
    .select('*', { head: true, count: 'exact' })
    .lt('created_at', item.created_at);

  const isLastArticle = Number(count) <= 0;

  if (error) {
    throw new Error("Couldn't find the product");
  }

  scrollToTop();

  return {
    ...item,
    isLastArticle,
  };
}

export type Product = {
  id: number;
  headImage: string;
  articleContent: string;
  productName: string;
  created_at: string;
  gallery: string[];
  productSite: string;
  isLastArticle: boolean;
};

const ProductPage = () => {
  const BASE_IMG_URL =
    'https://qfwsyrybrxidfdqfjkui.supabase.co/storage/v1/object/public/product-images/';
  const navigate = useNavigate();
  const navigation = useNavigation();

  const {
    articleContent,
    gallery,
    headImage,
    productName,
    productSite,
    created_at,
    isLastArticle,
  }: Product = useLoaderData() as Awaited<ReturnType<typeof productLoader>>; // router has an issue here, temporary solution

  const nextArticleLoad = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('id')
        .lt('created_at', created_at)
        .order('created_at', { ascending: false })
        .limit(1);

      if (error) throw new Error(error.message);

      const nextProductId = (data && data[0]?.id) || null;

      navigate(`/product/${nextProductId}`);
    } catch (error) {
      console.error('An error occurred:', error);
      throw new Error('Something went wrong');
    }
  };

  const returnHome = async () => {
    try {
      const { error, count } = await supabase
        .from('products')
        .select('*', { head: true, count: 'exact' })
        .gte('created_at', created_at);

      if (error) throw new Error(error.message);

      const page = Math.ceil(Number(count) / productsPerPage - 1);

      navigate(`../${page}`);
    } catch (error) {
      throw new Error('Something went wrong');
    }
  };

  if (navigation.state === 'loading') {
    return <PageLoader />;
  }

  return (
    <div>
      <section className="grid max-w-screen-2xl lg:m-auto lg:grid-cols-[10fr,1fr] lg:grid-rows-[1fr,10fr]">
        <header
          className="z-50 col-start-1 row-start-1 h-32 p-2
          lg:col-end-3 lg:flex lg:h-auto lg:items-center lg:p-0"
        >
          <button
            className="rounded-lg border border-gray-700 bg-black/70 p-3 text-4xl text-white
            backdrop-blur-md transition-all duration-500 hover:border-gray-300
          hover:bg-white/40 hover:text-black hover:shadow-md lg:hidden"
            onClick={returnHome}
          >
            <IoIosArrowRoundBack />
          </button>

          {/* button for large displays */}
          <button
            className="hidden p-4 text-7xl text-black transition-all hover:-translate-x-2 lg:block"
            onClick={returnHome}
          >
            <IoIosArrowRoundBack />
          </button>
        </header>
        <h1
          className="text-writing-mode hidden max-h-[1200px] p-12 text-center font-serif text-7xl font-semibold
          uppercase lg:col-[2_/_3] lg:row-[1_/_3] lg:block"
        >
          {productName}
        </h1>
        <article className="col-start-1 row-start-1 lg:col-[1_/_2] lg:row-[2_/_3]">
          <figure
            className="flex h-[90vh] flex-col-reverse items-center bg-cover bg-center
            px-2 pb-4 lg:h-3/5 lg:items-start lg:rounded-[0_0.75rem_0.75rem_0] lg:pb-2 2xl:rounded-xl"
            style={{ backgroundImage: `url(${BASE_IMG_URL + headImage})` }}
          >
            <a
              href={productSite}
              target="_blank"
              rel="noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-lg border
               border-gray-700 bg-black/70 p-3 text-center align-baseline text-white backdrop-blur-md
               transition-all duration-500
              hover:border-gray-300 hover:bg-white/40 hover:text-black hover:shadow-md sm:max-w-xs lg:max-w-xs"
            >
              <GoGlobe className="text-2xl" />
              <p>Explore Product</p>
            </a>
          </figure>
          <h1 className="p-5 px-10 text-center font-serif text-4xl font-semibold uppercase lg:hidden">
            {productName}
          </h1>
          <p className="m-auto max-w-3xl p-2 pb-8 text-lg font-light lg:relative lg:left-20 lg:p-10">
            {articleContent}
          </p>
        </article>
      </section>
      <section className="mb-8 flex flex-col gap-2 px-2 md:flex-row md:items-end md:overflow-x-scroll">
        {gallery?.map((imageUrl: string) => {
          return (
            <img
              key={gallery.indexOf(imageUrl)}
              className="rounded-xl object-contain md:max-h-[600px]"
              src={BASE_IMG_URL + imageUrl}
              alt="Product Image"
            />
          );
        })}
      </section>
      <section className="flex justify-center p-2">
        {/* <button
          onClick={scrollToTop}
          className="flex flex-col items-center p-3 text-gray-200 transition-all hover:text-black"
        >
          <BsFillArrowUpSquareFill className="text-5xl" />
          <p className="text-sm font-light">Go to Top</p>
        </button> */}
        {!isLastArticle ? (
          <button
            onClick={nextArticleLoad}
            className="flex w-full flex-col items-center p-3 text-black transition-all hover:text-gray-400"
          >
            <p className="font-medium uppercase">Read Next Article</p>
            <IoIosArrowDown className="animate-bounce text-3xl" />
          </button>
        ) : (
          <div className="flex flex-col">
            <p className="font-light text-gray-400">That was the last article</p>
            <button
              onClick={() => navigate('/')}
              className="group flex items-center justify-center rounded-xl p-5 text-black
              transition-all hover:bg-gray-200
              "
            >
              <IoIosArrowDown className="relative right-2 rotate-90 animate-pulse text-2xl group-hover:animate-none" />
              <p className="relative right-2 font-medium uppercase">Go Home</p>
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default ProductPage;
