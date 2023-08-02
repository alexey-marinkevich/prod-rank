import { Outlet } from 'react-router-dom';
import { Header } from '../components';

function HomePage() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default HomePage;
