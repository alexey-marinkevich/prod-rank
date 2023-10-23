/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { Product } from '../pages/ProductPage';

const BASE_ROUTE =
  'https://qfwsyrybrxidfdqfjkui.supabase.co/storage/v1/object/public/product-images/';

function ProductCard({ props }: { props: Product }) {
  const { id, headImage, articleContent, productName } = props;

  return (
    <Link
      to={`/product/${id}`}
      className="group flex h-[86vh] snap-start snap-always scroll-mt-3 flex-col overflow-hidden rounded-3xl shadow-md transition-[transform,box-shadow]
      duration-500 md:h-[600px] md:snap-align-none md:snap-normal lg:h-[430px]
      lg:flex-row mouse:hover:scale-95 mouse:hover:shadow-xl
      "
    >
      <div
        className="
          h-3/4 w-full overflow-hidden rounded-3xl
          lg:h-full lg:w-4/6
        "
      >
        <div
          className={`h-full w-full bg-cover transition-transform duration-500 mouse:group-hover:scale-105`}
          style={{ backgroundImage: `url(${BASE_ROUTE + headImage})` }}
        />
      </div>
      <div className="h-1/3 overflow-hidden p-3 pb-6 lg:h-auto lg:w-1/2 lg:p-6">
        <h2 className="mb-2.5 font-serif text-2xl font-semibold uppercase">
          {productName}
        </h2>
        <p className="h-4/5 overflow-hidden text-base font-light lg:h-[93%]">
          {articleContent}
        </p>
      </div>
    </Link>
  );
}

export default ProductCard;
