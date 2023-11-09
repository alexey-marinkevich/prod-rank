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
      className="group flex h-[610px] snap-start snap-always scroll-mt-3 flex-col overflow-hidden
      rounded-3xl shadow-md transition-[transform,box-shadow] duration-500
      md:snap-align-none md:snap-normal lg:h-[430px] lg:flex-row mouse:hover:scale-95
      mouse:hover:shadow-xl
      "
    >
      <div className="h-3/4 w-full overflow-hidden rounded-3xl lg:h-full lg:w-4/6">
        <div
          className={`h-full w-full bg-cover transition-transform duration-500 mouse:group-hover:scale-105`}
          style={{ backgroundImage: `url(${BASE_ROUTE + headImage})` }}
        />
      </div>
      <div className="m-4 h-1/3 overflow-hidden lg:m-6 lg:mb-8 lg:h-auto lg:w-1/2">
        <h2 className="mb-2.5 font-serif text-2xl font-semibold uppercase leading-6">
          {productName}
        </h2>
        <p className="overflow-hidden text-base font-light">{articleContent}</p>
      </div>
    </Link>
  );
}

export default ProductCard;
