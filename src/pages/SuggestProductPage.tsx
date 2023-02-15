import { Form, Link } from 'react-router-dom';

function SuggestProductPage() {
  return (
    <div className="m-auto mb-20 max-w-5xl p-2 md:p-5">
      <section className="mb-20 grid items-center sm:grid-cols-2">
        <Link to="/">Back</Link>
        <h1 className="text-lg md:text-right">
          Place where you can suggest interesting and good quality products of small or
          less popular companies to share with others and get to know about it more range
          of people
        </h1>
      </section>
      <Form>
        <section className="mb-10">
          <h2 className="mb-4 text-2xl">Main Data</h2>
          <div className="grid gap-4 gap-y-8 sm:grid-cols-2">
            <label className="relative">
              <p className="absolute top-[-13px] left-4 bg-white px-1">Product Name</p>
              <input
                type="text"
                name="name"
                className="w-full rounded-md border-2 border-gray-400 p-3"
              />
            </label>
            <label className="relative">
              <p className="absolute top-[-13px] left-4 bg-white px-1">Product Site</p>
              <input
                type="text"
                name="site"
                className="w-full rounded-md border-2 border-gray-400 p-3"
              />
            </label>
            <label className="relative">
              <p className="absolute top-[-13px] left-4 bg-white px-1">Main Image</p>
              <input
                type="file"
                name="headImage"
                accept="image/x-png,image/jpeg"
                className="col-span-2 w-full rounded-md border-2 border-gray-400 p-3"
              />
            </label>
            <label className="relative sm:col-span-2">
              <p className="absolute top-[-13px] left-4 bg-white px-1">
                Product Description
              </p>
              <textarea
                name="description"
                className="min-h-[300px] w-full resize-none rounded-md border-2 border-gray-400 p-3 sm:min-h-[200px]"
              />
            </label>
          </div>
        </section>
        <section className="mb-10">
          <h2 className="mb-4 text-2xl">Image Gallery</h2>
          <p className="md: max-w-lg">
            Additional images to show more about product. Recommend to paste image url
            directly from the product site or other high quality site
          </p>
          <div className="">
            <input type="file" name="images" accept="image/x-png,image/jpeg" multiple />
            {/* here will be gallery */}
          </div>
        </section>
        <section className="m-auto grid gap-2 text-center sm:max-w-xs">
          <button
            type="submit"
            className="rounded-lg border-2 bg-gray-800 p-3 text-white transition-colors hover:border-black hover:bg-black"
          >
            Submit
          </button>
          <Link
            to="products/:id"
            className="p-3 text-gray-500 transition-colors hover:text-black"
          >
            Show Preview
          </Link>
        </section>
      </Form>
    </div>
  );
}

export default SuggestProductPage;
