import { motion } from 'framer-motion';
import { ANIMATED_EVENTS, ERA_COLORS } from '../data/animatedEvents';
import styles from './ProgressBar.module.css';

interface ProgressBarProps {
  currentIndex: number;
  onNavigate: (index: number) => void;
}

export function ProgressBar({ currentIndex, onNavigate }: ProgressBarProps) {
  const total = ANIMATED_EVENTS.length;
  const progress = currentIndex / (total - 1);

  return (
    <div className={styles.progressBar} aria-label="Timeline progress">
      <span className={styles.yearLabel}>{ANIMATED_EVENTS[0].yearDisplay}</span>

      <div className={styles.track}>
        <motion.div
          className={styles.fill}
          animate={{ scaleX: progress }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          style={{ transformOrigin: 'left' }}
        />
        {ANIMATED_EVENTS.map((event, i) => {
          const position = (i / (total - 1)) * 100;
          const isActive = i === currentIndex;
          const eraColor = ERA_COLORS[event.era];

          return (
            <button
              key={event.id}
              className={`${styles.dot} ${isActive ? styles.dotActive : ''}`}
              style={{
                left: `${position}%`,
                backgroundColor: eraColor,
              }}
              onClick={() => onNavigate(i)}
              aria-label={`${event.title} (${event.yearDisplay})`}
              aria-current={isActive ? 'step' : undefined}
            />
          );
        })}
      </div>

      <span className={styles.yearLabel}>{ANIMATED_EVENTS[total - 1].yearDisplay}</span>
    </div>
  );
}
