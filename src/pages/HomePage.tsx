import { Outlet } from 'react-router-dom';
import { NavBar } from '../components';

function HomePage() {
  return (
    <section>
      <NavBar />
      <Outlet />
    </section>
  );
}

export default HomePage;
