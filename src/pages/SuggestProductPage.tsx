import { Form, Link, redirect, useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

import supabase from '../supabase';

let headImgFile: File | null;
let galleryFiles: FileList | null;

type CreateProduct = {
  productName: FormDataEntryValue;
  productSite: FormDataEntryValue;
  articleContent: FormDataEntryValue;
  headImage: string;
  gallery: string[];
};

export async function suggestProductAction({ request }: { request: Request }) {
  const { name, siteUrl, description } = Object.fromEntries(await request.formData());
  const submission: CreateProduct = {
    productName: name,
    productSite: siteUrl,
    articleContent: description,
    headImage: '',
    gallery: [],
  };

  // upload headImg to bucket
  if (headImgFile) {
    const { data, error } = await supabase.storage
      .from('product-images')
      .upload(uuid(), headImgFile);

    if (error) {
      console.error(error);
      return null;
    }
    submission.headImage = data?.path;
  }

  // receive all productImages
  async function uploadImage(file: File) {
    const { data, error } = await supabase.storage
      .from('product-images')
      .upload(uuid(), file);
    if (error) {
      throw error;
    }

    submission.gallery?.push(data.path);
  }

  if (galleryFiles?.length) {
    const galleryArray = Array.from(galleryFiles);
    await Promise.all(
      galleryArray.map(async (file) => {
        await uploadImage(file);
      })
    );
  }
  // create new item in db with submission params
  const { error } = await supabase.from('products').insert(submission);
  if (error) {
    console.error(error);
    throw new Error("Product wasn't saved");
  }

  return redirect('/0');
}

function SuggestProductPage() {
  const navigate = useNavigate();
  return (
    <div className="m-auto mb-20 max-w-5xl p-2 md:p-5">
      <section className="mb-20 grid items-center sm:grid-cols-2">
        <button onClick={() => navigate(-1)} className="max-w-xs text-start">
          Back
        </button>
        <h1 className="text-lg md:text-right">
          Place where you can suggest interesting and good quality products of small or
          less popular companies to share with others and get to know about it more range
          of people
        </h1>
      </section>
      <Form method="post" action="/suggest">
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
                name="siteUrl"
                className="w-full rounded-md border-2 border-gray-400 p-3"
              />
            </label>
            <label>
              <p className="mb-2">Main Image</p>
              <div className="flex items-center gap-4">
                <a className="block cursor-pointer rounded-lg bg-black p-3 text-center text-white transition-all hover:scale-95 md:w-1/2">
                  Select Image
                </a>
                <p id="main-image-confirm" className="hidden text-green-500">
                  Image selected
                </p>
              </div>
              <input
                type="file"
                name="headImage"
                accept="image/x-png,image/jpeg"
                className="col-span-2 hidden w-full rounded-md border-2 border-gray-400 p-3"
                onChange={(e) => {
                  headImgFile = e.target.files && e.target.files[0];
                  const img = document.querySelector('#main-image-confirm');
                  img?.classList.remove('hidden');
                }}
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
        <section className="mb-20">
          <h2 className="mb-4 text-2xl">Image Gallery</h2>
          <p className="mb-2 sm:max-w-lg">
            Additional images to show more about product. Recommend to paste image url
            directly from the product site or other high quality site
          </p>
          <label>
            <a className="block cursor-pointer rounded-lg bg-black p-3 text-center text-white transition-all hover:scale-95 sm:w-1/4">
              Select Images
            </a>
            <input
              type="file"
              name="images"
              accept="image/x-png,image/jpeg"
              multiple
              onChange={(e) => (galleryFiles = e.target.files)}
              className="hidden"
            />
            {/* here will be gallery */}
          </label>
        </section>
        <section className="m-auto grid gap-2 text-center sm:max-w-xs">
          <button
            type="submit"
            className="rounded-lg bg-black p-3 text-white transition-colors hover:bg-gray-800"
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
