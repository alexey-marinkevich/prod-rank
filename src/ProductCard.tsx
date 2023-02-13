function ProductCard() {
  return (
    <a
      href="#"
      className="
        group flex h-[600px] flex-col overflow-hidden rounded-3xl shadow-md transition-[transform,box-shadow] duration-500
        hover:scale-95 hover:shadow-xl lg:h-[400px] lg:flex-row
      "
    >
      <div
        className="
          h-3/4 w-full overflow-hidden rounded-3xl
          lg:h-full lg:w-1/2
        "
      >
        <div
          className="
            h-full w-full bg-[url('https://cdn.shopify.com/s/files/1/0231/2060/9358/files/Home_Gray_Loft_600x.jpg?v=1557771826')]
            bg-cover transition-transform duration-500 group-hover:scale-105
          "
        />
      </div>
      <div className="p-3 pb-6 lg:w-1/2">
        <h2 className="mb-1 text-2xl">Atom shoes</h2>
        <p className="text-base">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur tempora fuga
          autem! Iusto repellendus natus nostrum suscipit modi odio quae veniam
          praesentium culpa quia necessitatibus ducimus totam, hic, laboriosam vel.
        </p>
      </div>
    </a>
  );
}

export default ProductCard;
