import { Link, useLocation } from 'react-router-dom';
import { trackAnalyticsEvent, type ViewMode } from '../../lib/analytics';
import styles from './ViewToggle.module.css';

interface ViewToggleProps {
  theme?: 'light' | 'dark';
}

export function ViewToggle({ theme = 'light' }: ViewToggleProps) {
  const location = useLocation();
  const isAnimated = location.pathname === '/' || location.pathname.startsWith('/animated');
  const currentView: ViewMode = isAnimated ? 'animated' : 'timeline';

  const handleViewSwitch = (toView: ViewMode) => {
    if (toView === currentView) {
      return;
    }

    trackAnalyticsEvent('view_mode_switch', {
      from_view: currentView,
      to_view: toView,
    });
  };

  return (
    <nav
      className={`${styles.viewToggle} ${styles[theme]}`}
      aria-label="View mode"
    >
      <Link
        to="/"
        className={`${styles.toggleOption} ${isAnimated ? styles.toggleActive : ''}`}
        onClick={() => handleViewSwitch('animated')}
      >
        Animated
      </Link>
      <Link
        to="/timeline/"
        className={`${styles.toggleOption} ${!isAnimated ? styles.toggleActive : ''}`}
        onClick={() => handleViewSwitch('timeline')}
      >
        Timeline
      </Link>
    </nav>
  );
}
