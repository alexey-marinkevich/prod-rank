/* eslint-disable tailwindcss/no-custom-classname, tailwindcss/classnames-order */
import { Link } from 'react-router-dom';
import { SiStarship } from 'react-icons/si';
import { BiMessageRoundedAdd } from 'react-icons/bi';

function Header() {
  return (
    <section
      className="
      m-auto grid max-w-7xl grid-cols-2
      place-content-center items-center p-2 pb-10 lg:grid-cols-3"
    >
      <div className="hidden lg:block"></div>
      <Link
        to="/0"
        className="group flex items-center gap-1 p-4 pl-0 transition-all lg:flex-col lg:gap-0 lg:justify-self-center lg:pl-4"
      >
        <SiStarship
          className=" text-4xl transition-all duration-500 ease-in-out
          group-hover:scale-110 group-hover:text-red-700 lg:text-5xl"
        />

        <p className="mt-1.5 font-handwritten text-2xl">Prod-Rank</p>
      </Link>
      <Link
        to="/suggest"
        className="justify-self-end rounded-lg border-2 p-3 transition-all hover:border-black hover:bg-black hover:text-white"
      >
        <BiMessageRoundedAdd className="text-3xl sm:hidden" />
        <p className="hidden sm:inline">Suggest Product</p>
      </Link>
    </section>
  );
}

export default Header;
