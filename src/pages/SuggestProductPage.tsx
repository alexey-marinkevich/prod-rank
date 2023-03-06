import { useState } from 'react';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { Form, Link, redirect, useNavigate, useNavigation } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { HiOutlineCheckCircle } from 'react-icons/hi';
import { IoCheckmarkCircleOutline, IoCheckmarkDoneCircleOutline } from 'react-icons/io5';

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

type ImgSelected = {
  headImg?: boolean;
  gallery?: boolean;
};

function SuggestProductPage() {
  const navigate = useNavigate();
  const navigation = useNavigation();

  const [imgSelected, setImgSelected] = useState<ImgSelected>({
    headImg: false,
    gallery: false,
  });

  return (
    <div className="m-auto mb-20 max-w-5xl p-2 md:p-5">
      <section className="mb-20 grid items-center sm:grid-cols-2">
        <button
          className="w-32 p-4 pl-0 text-7xl text-black transition-all hover:-translate-x-2"
          onClick={() => navigate(-1)}
        >
          <IoIosArrowRoundBack />
        </button>
        <h1 className="text-lg md:text-right">
          Place where you can suggest interesting and good quality products of small or
          less popular companies to share with others and get to know about it more range
          of people
        </h1>
      </section>
      <Form method="post" action="/suggest">
        <fieldset disabled={navigation.state === 'submitting'}>
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
              <div>
                <p className="mb-2">Main Image</p>
                <label className="inline-block w-1/2">
                  {!imgSelected.headImg ? (
                    <a className="block w-full cursor-pointer rounded-lg bg-black p-3 text-center text-white transition-all hover:scale-95">
                      Select Image
                    </a>
                  ) : (
                    <a className="block w-full cursor-pointer rounded-lg bg-green-600 p-3 text-center text-white transition-all hover:scale-95">
                      <span className="flex w-full items-center justify-center gap-2">
                        <IoCheckmarkCircleOutline className="text-2xl" />
                        <p>Image selected</p>
                      </span>
                    </a>
                  )}
                  <input
                    type="file"
                    name="headImage"
                    accept="image/x-png,image/jpeg"
                    className="col-span-2 hidden w-full rounded-md border-2 border-gray-400 p-3"
                    onChange={(e) => {
                      headImgFile = e.target.files && e.target.files[0];
                      setImgSelected((prevState) => ({ ...prevState, headImg: true }));
                    }}
                  />
                </label>
              </div>
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
            <label className="block w-1/4">
              {!imgSelected.gallery ? (
                <a className="block w-full cursor-pointer rounded-lg bg-black p-3 text-center text-white transition-all hover:scale-95">
                  Select Images
                </a>
              ) : (
                <a className="block w-full cursor-pointer rounded-lg bg-green-600 p-3 text-center text-white transition-all hover:scale-95">
                  <span className="flex w-full items-center justify-center gap-2">
                    <IoCheckmarkDoneCircleOutline className="text-2xl" />
                    <p>Images selected</p>
                  </span>
                </a>
              )}
              <input
                type="file"
                name="images"
                accept="image/x-png,image/jpeg"
                multiple
                onChange={(e) => {
                  galleryFiles = e.target.files;
                  setImgSelected((prevState) => ({ ...prevState, gallery: true }));
                }}
                className="hidden"
              />
            </label>
            {/* here will be gallery */}
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
        </fieldset>
      </Form>
    </div>
  );
}

export default SuggestProductPage;
