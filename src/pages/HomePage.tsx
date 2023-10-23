import { Outlet } from 'react-router-dom';
import { NavBar } from '../components';

function HomePage() {
  return (
    <section className="snap-y snap-mandatory md:snap-none">
      <NavBar />
      <Outlet />
    </section>
  );
}

export default HomePage;
