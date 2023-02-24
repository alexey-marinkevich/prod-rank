import { Outlet } from 'react-router-dom';
import Header from '../Header';

function HomePage() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default HomePage;
