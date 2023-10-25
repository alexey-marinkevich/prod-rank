export const scrollToTop = () => {
  const layoutPage = document.getElementById('layout-page');

  return layoutPage?.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};
