function ProductCard() {
  return (
    <a
      href="#"
      className="
        flex h-[600px] flex-col overflow-hidden rounded-3xl shadow-md
        md:h-[400px] md:flex-row
      "
    >
      <div
        className="
          h-3/4 w-full rounded-3xl bg-[url('https://cdn.shopify.com/s/files/1/0231/2060/9358/files/Home_Gray_Loft_600x.jpg?v=1557771826')] bg-cover bg-center
          md:h-full md:w-1/2
        "
      />
      <div className="p-3 pb-6 md:w-1/2">
        <h2 className="mb-1 text-2xl">Somewhat shoes</h2>
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
