import { TbLoader2 } from 'react-icons/tb';

const PageLoader = () => {
  return (
    <div className="flex h-[70vh] flex-col items-center justify-center gap-1">
      <TbLoader2 className="animate-spin text-6xl" />
      <p className="animate-pulse">Loading...</p>
    </div>
  );
};

export default PageLoader;
