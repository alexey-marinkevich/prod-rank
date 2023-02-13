function Header() {
  return (
    <nav className="grid h-14 grid-cols-2 place-content-center p-3">
      <div>
        <a href="#" className="p-2">
          Logo
        </a>
      </div>
      <div className="justify-self-end ">
        <a href="#" className="justify-self-end rounded-lg border p-3">
          Suggest Product
        </a>
      </div>
    </nav>
  );
}

export default Header;
