import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from '../components';
import ScrollBtn from '../components/ScrollBtn';

const LayoutPage = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const button = document.getElementById('goTopBtn');
    const footer = document.getElementById('footer');

    const handleScroll = () => {
      // Calculate scroll position
      const scrollHeight = window.scrollY;

      // Update button visibility based on scroll position
      if (scrollHeight > 800) return setShowButton(true);

      return setShowButton(false);
    };

    const adjustButtonPosition = () => {
      const viewport = window.innerHeight;

      if (button && footer) {
        const footerRect = footer.getBoundingClientRect();

        if (footerRect.top < viewport) {
          const offset = viewport - footerRect.top + 40;
          return (button.style.bottom = offset + 'px');
        }

        return (button.style.bottom = '20px');
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', adjustButtonPosition);
    window.addEventListener('resize', adjustButtonPosition);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', adjustButtonPosition);
      window.removeEventListener('resize', adjustButtonPosition);
    };
  }, []);

  return (
    <div>
      <Outlet />
      <Footer />
      {showButton && <ScrollBtn />}
    </div>
  );
};

export default LayoutPage;
