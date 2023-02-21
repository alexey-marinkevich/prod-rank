import { Params, useLoaderData, useNavigate } from 'react-router-dom';
import supabase from '../supabase';

export async function getProduct({ params }: { params: Params }) {
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
  const {
    articleContent,
    // created_at,  todo: Add date of creation
    gallery,
    headImage,
    productName,
    productSite,
  }: Product = useLoaderData() as Awaited<ReturnType<typeof getProduct>>; // router has an issue here, temporary solution
  return (
    <div>
      <section className="grid max-w-screen-2xl lg:m-auto lg:grid-cols-[10fr,1fr] lg:grid-rows-[1fr,10fr]">
        <header
          className="lg: z-50 col-start-1 row-start-1 h-32 p-8 px-2 lg:col-end-3
           lg:h-auto lg:p-8"
        >
          <button onClick={() => navigate(-1)}>Go back</button>
        </header>
        <h1
          className="text-writing-mode hidden max-h-[1200px] p-12 text-center text-6xl font-semibold
          lg:col-[2_/_3] lg:row-[1_/_3] lg:block"
        >
          {productName}
        </h1>
        <article className="col-start-1 row-start-1 lg:col-[1_/_2] lg:row-[2_/_3]">
          <figure
            className="flex h-screen flex-col-reverse items-center bg-cover bg-center lg:h-[90vh] lg:items-start"
            style={{ backgroundImage: `url(${BASE_IMG_URL + headImage})` }}
          >
            {/* todo: add icon */}
            <a
              href={productSite}
              target="_blank"
              rel="noreferrer"
              className="m-14 w-11/12 rounded-lg border border-gray-700 bg-black/70 p-3
              text-center text-white backdrop-blur-md transition-all duration-500
              hover:border-gray-300 hover:bg-white/40 hover:text-black hover:shadow-md sm:max-w-xs lg:max-w-[150px]"
            >
              Explore Site
            </a>
          </figure>
          <h1 className="p-5 px-10 text-center text-4xl font-semibold lg:hidden">
            {productName}
          </h1>
          <p className="m-auto max-w-3xl p-2 pb-8 text-lg lg:relative lg:left-20 lg:p-10">
            {articleContent}
          </p>
        </article>
      </section>
      <section className="mb-24 flex items-end gap-2 overflow-x-scroll px-1">
        {gallery?.map((imageUrl: string) => {
          return (
            <img
              key={gallery.indexOf(imageUrl)}
              className="h-[80vh] max-h-[600px] max-w-none rounded-xl object-contain"
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
