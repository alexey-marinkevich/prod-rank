import { IoIosArrowRoundUp } from 'react-icons/io';
import { scrollToTop } from '../utilities';

const ScrollBtn = () => (
  <button
    id="go-top-btn"
    onClick={scrollToTop}
    className="fixed bottom-5 right-5 rounded-lg border border-gray-300/50 bg-white/40 p-3 text-4xl text-gray-900
    shadow-lg backdrop-blur-md transition-all duration-500 hover:border-gray-700 hover:bg-black/70
    hover:text-gray-100"
  >
    <IoIosArrowRoundUp />
  </button>
);

export default ScrollBtn;
