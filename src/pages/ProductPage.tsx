import { type Params, useLoaderData, useNavigate, useNavigation } from 'react-router-dom';
import { GoGlobe } from 'react-icons/go';
import { IoIosArrowRoundBack } from 'react-icons/io';

import supabase from '../supabase';
import { PageLoader } from '../components';

export async function productLoader({ params }: { params: Params }) {
  const { id } = params;

  const { data: item, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw new Error("Couldn't find the product");
  }

  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });

  return item;
}

export type Product = {
  id: number;
  headImage: string;
  articleContent: string;
  productName: string;
  created_at: string;
  gallery: string[];
  productSite: string;
};

function ProductPage() {
  const BASE_IMG_URL =
    'https://qfwsyrybrxidfdqfjkui.supabase.co/storage/v1/object/public/product-images/';
  const navigate = useNavigate();
  const navigation = useNavigation();
  const { articleContent, gallery, headImage, productName, productSite }: Product =
    useLoaderData() as Awaited<ReturnType<typeof productLoader>>; // router has an issue here, temporary solution

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
            className="rounded-lg border border-gray-700 bg-black/70 p-2 text-4xl text-white
            backdrop-blur-md transition-all duration-500 hover:border-gray-300
          hover:bg-white/40 hover:text-black hover:shadow-md lg:hidden"
            onClick={() => navigate(-1)}
          >
            <IoIosArrowRoundBack />
          </button>

          {/* button for large displays */}
          <button
            className="hidden p-4 text-7xl text-black transition-all hover:-translate-x-2 lg:block"
            onClick={() => navigate(-1)}
          >
            <IoIosArrowRoundBack />
          </button>
        </header>
        <h1
          className="text-writing-mode hidden max-h-[1200px] p-12 text-center font-serif text-6xl font-semibold
          lg:col-[2_/_3] lg:row-[1_/_3] lg:block"
        >
          {productName}
        </h1>
        <article className="col-start-1 row-start-1 lg:col-[1_/_2] lg:row-[2_/_3]">
          <figure
            className="flex h-screen flex-col-reverse items-center bg-cover bg-center lg:h-[90vh] lg:items-start"
            style={{ backgroundImage: `url(${BASE_IMG_URL + headImage})` }}
          >
            <a
              href={productSite}
              target="_blank"
              rel="noreferrer"
              className="m-14 flex w-11/12 items-center justify-center gap-2 rounded-lg border border-gray-700 bg-black/70 p-3 text-center
              align-baseline text-white backdrop-blur-md transition-all duration-500
              hover:border-gray-300 hover:bg-white/40 hover:text-black hover:shadow-md sm:max-w-xs lg:max-w-xs"
            >
              <GoGlobe className="text-2xl" />
              <p>Explore Product</p>
            </a>
          </figure>
          <h1 className="p-5 px-10 text-center font-serif text-4xl font-semibold lg:hidden">
            {productName}
          </h1>
          <p className="m-auto max-w-3xl p-2 pb-8 text-lg font-light lg:relative lg:left-20 lg:p-10">
            {articleContent}
          </p>
        </article>
      </section>
      <section className="mb-24 flex items-end gap-2 overflow-x-scroll px-1">
        {gallery?.map((imageUrl: string) => {
          return (
            <img
              key={gallery.indexOf(imageUrl)}
              className="max-h-[600px] rounded-xl object-contain"
              src={BASE_IMG_URL + imageUrl}
              alt="Product Image"
            />
          );
        })}
      </section>
    </div>
  );
}

export default ProductPage;
