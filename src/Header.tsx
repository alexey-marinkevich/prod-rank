function Header() {
  return (
    <nav
      className="
    grid h-14 grid-cols-2 place-content-center p-2
    lg:grid-cols-3
    "
    >
      <div className="hidden lg:block"></div>
      <div className="lg:justify-self-center">
        <a href="#" className="p-2">
          Logo
        </a>
      </div>
      <div className="justify-self-end ">
        <a
          href="#"
          className=" rounded-lg border-2 p-3 transition-colors hover:border-black hover:bg-black hover:text-white"
        >
          Suggest Product
        </a>
      </div>
    </nav>
  );
}

export default Header;
