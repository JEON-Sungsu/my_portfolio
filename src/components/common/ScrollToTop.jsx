import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    // 메인 페이지로 돌아갈 때는 저장된 위치로 스크롤
    if (pathname === '/') {
      const savedPosition = sessionStorage.getItem('scrollPosition');
      if (savedPosition) {
        window.scrollTo({
          top: parseInt(savedPosition, 10),
          left: 0,
          behavior: 'instant',
        });
        sessionStorage.removeItem('scrollPosition');
      } else {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'instant',
        });
      }
    } else {
      // 다른 페이지로 이동 시 맨 위로 (즉시)
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant',
      });
    }
  }, [pathname]);

  return null;
}

export default ScrollToTop;
