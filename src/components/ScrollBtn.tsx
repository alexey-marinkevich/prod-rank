import { IoIosArrowRoundUp } from 'react-icons/io';
import { scrollToTop } from '../utilities';

const ScrollBtn = () => (
  <button
    onClick={scrollToTop}
    className="fixed bottom-5 right-5 rounded-lg border border-gray-300 bg-white/40 p-3 text-4xl text-gray-900
    backdrop-blur-md transition-all duration-500 hover:border-gray-700 hover:bg-black/70 hover:text-gray-100
    hover:shadow-md"
  >
    <IoIosArrowRoundUp />
  </button>
);

export default ScrollBtn;
