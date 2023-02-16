import { Link } from 'react-router-dom';

function ProductPage() {
  return (
    <div>
      <section className="grid">
        <header
          className="lg: z-50 col-start-1 row-start-1 h-32 p-8 px-2
           lg:h-auto lg:p-8"
        >
          {/* TODO: add multiple routes */}
          <Link to="/" className="p-8 pl-0">
            Go back
          </Link>
        </header>
        <h1 className="text-writing-mode hidden max-h-[920px] text-6xl font-semibold lg:block">
          Atom Shoes
        </h1>
        <article className="col-start-1 row-start-1 lg:row-start-2">
          <figure
            className='flex h-screen flex-col-reverse items-center bg-[url("https://cdn.shopify.com/s/files/1/0231/2060/9358/files/Home_BW_Closeup_1024x.jpg?v=1556563118")] bg-cover bg-center
            lg:h-[80vh] lg:items-start
          '
          >
            {/* icon */}
            <a
              href="#"
              className="m-14 w-11/12 rounded-lg border border-gray-700 bg-black/70 p-3 text-center text-white backdrop-blur-md
               transition-all duration-500 hover:border-gray-300 hover:bg-white/40 hover:text-black hover:shadow-md sm:max-w-xs lg:max-w-[150px]"
            >
              Explore Site
            </a>
          </figure>
          <h1 className="p-5 px-10 text-center text-4xl font-semibold lg:hidden">
            Atoms Shoes
          </h1>
          <p className="m-auto max-w-2xl p-2 pb-8 text-lg lg:p-10">
            Atoms may look simple, but they’re packed with features. Our elastic laces
            mean you only have to tie your shoes once. We developed a custom foam midsole
            that molds to your feet, making them even more comfortable with every wear.
            Insoles are lined with antimicrobial copper to kill bacteria and prevent odor.
            All materials are extra lightweight & soft for cloud-like cushioning.
          </p>
        </article>
      </section>
      <section className="mb-24 flex items-end gap-2 overflow-x-scroll px-1">
        <img
          className="max-h-[80vh] max-w-none rounded-xl object-contain"
          src="https://cdn.shopify.com/s/files/1/0231/2060/9358/files/Home_BW_Closeup_1024x.jpg?v=1556563118"
          alt="Product Image"
        />
        <img
          className="max-h-[80vh] max-w-none rounded-xl object-contain"
          src="https://cdn.shopify.com/s/files/1/0231/2060/9358/files/Home_Gray_Loft_600x.jpg?v=1557771826"
          alt="Product Image"
        />
        <img
          className="max-h-[80vh] max-w-none rounded-xl object-contain"
          src="https://cdn.shopify.com/s/files/1/0231/2060/9358/files/Home_BW_Closeup_1024x.jpg?v=1556563118"
          alt="Product Image"
        />
        <img
          className="max-h-[80vh] max-w-none rounded-xl object-contain"
          src="https://cdn.shopify.com/s/files/1/0231/2060/9358/files/Home_Gray_Loft_600x.jpg?v=1557771826"
          alt="Product Image"
        />
      </section>
    </div>
  );
}

export default ProductPage;
