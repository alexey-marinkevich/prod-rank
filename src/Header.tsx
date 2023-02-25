import { Link } from 'react-router-dom';
function Header() {
  return (
    <section
      className="
    m-auto grid h-14 max-w-7xl grid-cols-[1fr,2fr]
    place-content-center p-2 py-10 lg:grid-cols-3
    "
    >
      <div className="hidden lg:block"></div>
      <div className="lg:justify-self-center">
        <Link to="/" className="p-4 pl-0 lg:pl-4">
          Logo
        </Link>
      </div>
      <div className="justify-self-end ">
        <Link
          to="/suggest"
          className="rounded-lg border-2 p-3 transition-all hover:border-black hover:bg-black hover:text-white"
        >
          Suggest Product
        </Link>
      </div>
    </section>
  );
}

export default Header;
