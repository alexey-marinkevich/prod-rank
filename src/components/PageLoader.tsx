import { TbLoader2 } from 'react-icons/tb';

const PageLoader = () => {
  return (
    <div
      className="flex h-[70vh] snap-start snap-always flex-col items-center justify-center gap-1
    md:snap-align-none md:snap-normal"
    >
      <TbLoader2 className="animate-spin text-6xl" />
      <p className="animate-pulse">Loading...</p>
    </div>
  );
};

export default PageLoader;
