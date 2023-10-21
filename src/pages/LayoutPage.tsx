import { Outlet } from 'react-router-dom';
import { Footer } from '../components';

const LayoutPage = () => (
  <div>
    <Outlet />
    <Footer />
  </div>
);

export default LayoutPage;
