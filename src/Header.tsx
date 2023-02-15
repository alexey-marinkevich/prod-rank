import { Link } from 'react-router-dom';
function Header() {
  return (
    <section
      className="
    grid h-14 grid-cols-2 place-content-center p-2
    lg:grid-cols-3
    "
    >
      <div className="hidden lg:block"></div>
      <div className="lg:justify-self-center">
        <Link to="/" className="p-2">
          Logo
        </Link>
      </div>
      <div className="justify-self-end ">
        <Link
          to="/suggest"
          className="rounded-lg border-2 p-3 transition-colors hover:border-black hover:bg-black hover:text-white"
        >
          Suggest Product
        </Link>
      </div>
    </section>
  );
}

export default Header;
