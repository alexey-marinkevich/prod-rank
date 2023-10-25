/* eslint-disable tailwindcss/no-custom-classname, tailwindcss/classnames-order */
import { Link } from 'react-router-dom';
import { SiStarship } from 'react-icons/si';
import { BiMessageRoundedAdd } from 'react-icons/bi';

function NavBar() {
  return (
    <section
      id="nav-bar"
      className="absolute z-50 m-auto w-full max-w-7xl p-1 transition-all duration-1000 md:relative md:p-0"
    >
      <nav
        className="m-auto grid grid-cols-2 place-content-center items-center
      rounded-xl border border-white/20 bg-white/30 p-2 shadow-lg backdrop-blur-md
      md:relative md:rounded-none md:bg-white md:py-4 md:px-2 md:shadow-none md:backdrop-blur-none lg:grid-cols-3"
      >
        <div className="hidden lg:block"></div>
        <Link
          to="/0"
          className="group flex items-center gap-1 pl-0 transition-all lg:flex-col lg:gap-0
          lg:justify-self-center lg:pl-4"
        >
          <SiStarship
            className="text-4xl text-gray-900 transition-all duration-500
            ease-in-out group-hover:scale-110  group-hover:text-red-700 lg:text-5xl"
          />

          <p className="mt-1.5 font-handwritten text-2xl text-gray-900">Prod-Rank</p>
        </Link>
        <Link
          to="/suggest"
          className="justify-self-end
          rounded-lg border border-gray-100/50 bg-white/40 p-3
          text-gray-900/80 shadow-md backdrop-blur-sm transition-all duration-500
        hover:border-gray-200/40 hover:bg-black/5 hover:text-gray-900/90
          md:bg-gray-50 md:hover:shadow-xl "
        >
          <BiMessageRoundedAdd className="text-3xl md:hidden" />
          <p className="hidden md:inline">Suggest Product</p>
        </Link>
      </nav>
    </section>
  );
}

export default NavBar;
