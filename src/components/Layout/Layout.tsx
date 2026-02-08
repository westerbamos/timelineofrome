import { Outlet, useLocation } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { ViewToggle } from '../ViewToggle/ViewToggle';
import styles from './Layout.module.css';

export function Layout() {
  const location = useLocation();
  const isAnimated = location.pathname === '/' || location.pathname.startsWith('/animated');

  return (
    <div className={styles.app}>
      <ViewToggle theme={isAnimated ? 'dark' : 'light'} />
      {!isAnimated && <Header />}
      <Outlet />
      {!isAnimated && <Footer />}
    </div>
  );
}
