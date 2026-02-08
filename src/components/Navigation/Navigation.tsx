import { useState, useEffect, type MouseEvent } from 'react';
import { motion } from 'framer-motion';
import { trackAnalyticsEvent } from '../../lib/analytics';
import { ERAS, type EraType } from '../../types';
import styles from './Navigation.module.css';

interface NavigationProps {
  currentEra: EraType | null;
}

export function Navigation({ currentEra }: NavigationProps) {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToEra = (event: MouseEvent<HTMLAnchorElement>, eraId: EraType) => {
    event.preventDefault();

    const element = document.getElementById(`era-${eraId}`);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      trackAnalyticsEvent('timeline_era_navigate', {
        era_id: eraId,
      });

      window.history.pushState(null, '', `#era-${eraId}`);
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <motion.nav
      className={`${styles.nav} ${isSticky ? styles.sticky : ''}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
    >
      <div className={styles.container}>
        <div className={styles.centerGroup}>
          <span className={styles.label}>Navigate to:</span>
          <div className={styles.buttons}>
            {ERAS.map((era) => (
              <a
                key={era.id}
                className={`${styles.button} ${currentEra === era.id ? styles.active : ''}`}
                href={`#era-${era.id}`}
                onClick={(event) => scrollToEra(event, era.id)}
                aria-current={currentEra === era.id ? 'location' : undefined}
              >
                <span className={styles.buttonText}>{era.name}</span>
                <span className={styles.buttonYears}>
                  {formatYear(era.startYear)}–{formatYear(era.endYear)}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

function formatYear(year: number): string {
  if (year < 0) {
    return `${Math.abs(year)} BC`;
  }
  return `${year} AD`;
}
