import { useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { v4 as uuid } from 'uuid';

import {
  redirect,
  useLoaderData,
  useNavigate,
  useNavigation,
  useSubmit,
} from 'react-router-dom';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { IoCheckmarkCircleOutline, IoCheckmarkDoneCircleOutline } from 'react-icons/io5';
import { CgSpinner } from 'react-icons/cg';

import supabase from '../supabase';

let headImgFile: File | null;
let galleryFiles: FileList | null;

type ProductLike = {
  productName: string;
  productSite: string;
  articleContent: string;
  headImage: string;
  gallery: string[];
};

export const suggestProductLoader = () => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  return { isMobile };
};

export const suggestProductAction = async ({ request }: { request: Request }) => {
  const formData = Object.fromEntries(await request.formData());
  const submission: ProductLike = {
    productName: formData.productName as string,
    productSite: formData.productSite as string,
    articleContent: formData.articleContent as string,
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

  headImgFile = null;
  galleryFiles = null;

  return redirect('/0');
};

type ImgSelected = {
  headImg?: boolean;
  gallery?: boolean;
};

const SuggestProductPage = () => {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const submit = useSubmit();
  const { isMobile } = useLoaderData() as Awaited<
    ReturnType<typeof suggestProductLoader>
  >;

  const [, setImgSelected] = useState<ImgSelected>({
    headImg: false,
    gallery: false,
  });

  const schema = yup
    .object({
      productName: yup
        .string()
        .required('Please, provide a name')
        .max(50, 'Product name should be less than 50 characters long')
        .trim(),
      productSite: yup
        .string()
        .required('Please, provide a URL')
        .url('Please, provide a valid URL')
        .trim(),
      articleContent: yup
        .string()
        .required('Please, provide a product description')
        .min(500, 'Description should be more than 500 characters long')
        .trim(),
      headImage: yup
        .mixed()
        .test('is-selected', 'Please, select a cover image', () => headImgFile != null),
      gallery: yup
        .mixed()
        .test('is-selected', 'Please, add gallery images', () => galleryFiles != null),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductLike>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: Omit<ProductLike, 'gallery'>) => {
    submit(data, { action: '/suggest', method: 'post' });
  };

  const handleAnchorKeyPress = (e: React.KeyboardEvent<HTMLAnchorElement>) => {
    if (e.key === 'Enter') {
      const fileInput = (e.target as HTMLElement).nextElementSibling as HTMLInputElement;
      if (fileInput) {
        fileInput.click();
      }
    }
  };

  return (
    <div className="m-auto mb-20 max-w-5xl p-2 md:p-5">
      <section className="mb-20 grid items-center sm:grid-cols-2">
        <button
          className="w-32 p-4 pl-0 text-7xl text-black transition-all hover:-translate-x-2"
          onClick={() => navigate(-1)}
        >
          <IoIosArrowRoundBack />
        </button>
        <h1 className="relative text-lg font-light md:text-right">
          Place where you can suggest interesting and good quality products of small or
          less popular companies to share with others and get to know about it more range
          of people
          <span
            className="text-writing-mode absolute top-0 -right-28 -z-50 hidden whitespace-nowrap font-serif
            text-[120px] font-extrabold text-neutral-200 lg:block"
          >
            Suggest Product
          </span>
        </h1>
      </section>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset disabled={navigation.state === 'submitting'}>
          <section className="mb-10">
            <h2 className="mb-4 font-serif text-3xl font-semibold">Main Data</h2>
            <div className="grid gap-4 gap-y-8 sm:grid-cols-2">
              <label className="relative">
                <p className="absolute top-[-13px] left-4 bg-white px-1">Product Name</p>
                <input
                  type="text"
                  {...register('productName')}
                  required={!!errors.productName?.message}
                  autoFocus={!isMobile}
                  className="w-full rounded-md border-2 border-gray-400 p-3 outline-none required:border-red-500 focus:border-black
                 focus:shadow-[0px_0px_0px_1px_#000] required:focus:border-red-500 required:focus:shadow-[0px_0px_0px_1px_#EF4444]"
                />
                <p className="text-red-500 empty:hidden">{errors.productName?.message}</p>
              </label>
              <label className="relative">
                <p className="absolute top-[-13px] left-4 bg-white px-1">Product Site</p>
                <input
                  type="text"
                  required={!!errors.productSite?.message}
                  {...register('productSite')}
                  className="w-full rounded-md border-2 border-gray-400 p-3 outline-none required:border-red-500 focus:border-black
                 focus:shadow-[0px_0px_0px_1px_#000] required:focus:border-red-500 required:focus:shadow-[0px_0px_0px_1px_#EF4444]"
                />
                <p className="text-red-500 empty:hidden">{errors.productSite?.message}</p>
              </label>
              <div>
                <p className="mb-2">Cover Image</p>
                <label className="inline-block w-full sm:w-[250px] ">
                  {!headImgFile ? (
                    <a
                      tabIndex={0}
                      onKeyDown={handleAnchorKeyPress}
                      className="block w-full cursor-pointer rounded-lg bg-black p-3 text-center text-white transition-all hover:scale-95"
                    >
                      Select Image
                    </a>
                  ) : (
                    <a
                      tabIndex={0}
                      onKeyDown={handleAnchorKeyPress}
                      className="block w-full cursor-pointer rounded-lg bg-green-600 p-3 text-center text-white transition-all hover:scale-95"
                    >
                      <span className="flex w-full items-center justify-center gap-1">
                        <IoCheckmarkCircleOutline className="text-2xl" />
                        <p>Image selected</p>
                      </span>
                    </a>
                  )}
                  <input
                    type="file"
                    {...register('headImage')}
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      headImgFile = e.target.files && e.target.files[0];
                      setImgSelected((prevState) => ({ ...prevState, headImg: true }));
                    }}
                  />
                </label>
                <p className="text-red-500 empty:hidden">{errors.headImage?.message}</p>
              </div>
              <label className="relative sm:col-span-2">
                <p className="absolute top-[-13px] left-4 bg-white px-1">
                  Product Description
                </p>
                <textarea
                  {...register('articleContent')}
                  required={!!errors.articleContent?.message}
                  className="min-h-[300px] w-full resize-none rounded-md border-2 border-gray-400 p-3 outline-none required:border-red-500 focus:border-black
                  focus:shadow-[0px_0px_0px_1px_#000] required:focus:border-red-500 required:focus:shadow-[0px_0px_0px_1px_#EF4444] sm:min-h-[200px]"
                />
                <p className="text-red-500 empty:hidden">
                  {errors.articleContent?.message}
                </p>
              </label>
            </div>
          </section>
          <section className="mb-20">
            <h2 className="mb-4 font-serif text-3xl font-semibold">Image Gallery</h2>
            <p className="mb-2 font-light sm:max-w-lg">
              Additional images to show more about product. Recommend to upload images
              directly from the product site, or other site with high quality
              representations of the product
            </p>
            <label className="block w-full sm:w-[250px]">
              {!galleryFiles?.length ? (
                <a
                  tabIndex={0}
                  onKeyDown={handleAnchorKeyPress}
                  className="block w-full cursor-pointer rounded-lg bg-black p-3 text-center text-white transition-all hover:scale-95"
                >
                  Select Images
                </a>
              ) : (
                <a
                  tabIndex={0}
                  onKeyDown={handleAnchorKeyPress}
                  className="block w-full cursor-pointer rounded-lg bg-green-600 p-3 text-center text-white transition-all hover:scale-95"
                >
                  <span className="flex w-full items-center justify-center gap-1">
                    <IoCheckmarkDoneCircleOutline className="text-2xl" />
                    <p>Images selected ({galleryFiles?.length})</p>
                  </span>
                </a>
              )}
              <input
                type="file"
                accept="image/*"
                {...register('gallery')}
                multiple
                onChange={(e) => {
                  galleryFiles = e.target.files;
                  setImgSelected((prevState) => ({ ...prevState, gallery: true }));
                }}
                className="hidden"
              />
            </label>
            <p className="text-red-500 empty:hidden">{errors.gallery?.message}</p>
          </section>
          <section className="m-auto grid gap-2 text-center sm:max-w-xs">
            <button
              type="submit"
              className="rounded-lg bg-black p-3 text-white transition-colors hover:bg-gray-800"
            >
              {navigation.state === 'submitting' ? (
                <span className="flex items-center justify-center gap-2">
                  <CgSpinner className="animate-spin text-2xl" />
                  <p>Submitting...</p>
                </span>
              ) : (
                'Submit'
              )}
            </button>
          </section>
        </fieldset>
      </form>
    </div>
  );
};

export default SuggestProductPage;
