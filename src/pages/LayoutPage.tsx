import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from '../components';
import ScrollBtn from '../components/ScrollBtn';

const LayoutPage = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const layout = document.getElementById('layout-page');

    const handleScroll = () => {
      // Calculate scroll position
      const scrollHeight = layout?.scrollTop;

      // Update button visibility based on scroll position
      if (scrollHeight && scrollHeight > 800) return setShowButton(true);

      return setShowButton(false);
    };

    const adjustButtonPosition = () => {
      const button = document.getElementById('go-top-btn');
      const footer = document.getElementById('footer');
      const viewport = window.innerHeight;

      if (button && footer) {
        const footerRect = footer.getBoundingClientRect();

        if (footerRect.top < viewport) {
          const offset = viewport - footerRect.top + 20;

          return (button.style.bottom = offset + 'px');
        }

        return (button.style.bottom = '20px');
      }
    };

    layout?.addEventListener('scroll', handleScroll);
    layout?.addEventListener('scroll', adjustButtonPosition);
    layout?.addEventListener('resize', adjustButtonPosition);

    // Clean up the event listener when the component unmounts
    return () => {
      layout?.removeEventListener('scroll', handleScroll);
      layout?.removeEventListener('scroll', adjustButtonPosition);
      layout?.removeEventListener('resize', adjustButtonPosition);
    };
  }, []);

  return (
    <div
      id="layout-page"
      className="absolute top-0 left-0 h-full snap-y snap-mandatory overflow-x-hidden overflow-y-scroll md:relative md:h-[100vh]
      md:snap-none"
    >
      <Outlet />
      <Footer />
      {showButton && <ScrollBtn />}
    </div>
  );
};

export default LayoutPage;
