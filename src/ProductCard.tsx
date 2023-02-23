/* eslint-disable react/prop-types */
//todo: fix props
import { Link } from 'react-router-dom';
import { Product } from './pages/ProductPage';

function ProductCard({ props }: { props: Product }) {
  const BASE_ROUTE =
    'https://qfwsyrybrxidfdqfjkui.supabase.co/storage/v1/object/public/product-images/';

  const { id, headImage, articleContent, productName } = props;
  return (
    <Link
      to={`/product/${id}`}
      className="
        group flex h-[600px] flex-col overflow-hidden rounded-3xl shadow-md transition-[transform,box-shadow] duration-500
        hover:scale-95 hover:shadow-xl lg:h-[400px] lg:flex-row
      "
    >
      <div
        className="
          h-3/4 w-full overflow-hidden rounded-3xl
          lg:h-full lg:w-4/6
        "
      >
        <div
          className={`h-full w-full bg-cover transition-transform duration-500 group-hover:scale-105`}
          style={{ backgroundImage: `url(${BASE_ROUTE + headImage})` }}
        />
      </div>
      <div className="h-1/3 overflow-hidden p-3 pb-6 lg:h-auto lg:w-1/2">
        <h2 className="mb-1 text-2xl">{productName}</h2>
        <p className="h-4/5 overflow-hidden text-base lg:h-[93%]">{articleContent}</p>
      </div>
    </Link>
  );
}

export default ProductCard;
