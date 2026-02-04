import { motion } from 'framer-motion';
import type { TimelineEvent } from '../../types';
import styles from './EventDetail.module.css';

interface EventDetailProps {
  id: string;
  event: TimelineEvent;
}

export function EventDetail({ id, event }: EventDetailProps) {
  return (
    <motion.div
      id={id}
      className={styles.detail}
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <div className={styles.content}>
        <div className={styles.divider} />

        <p className={styles.description}>{event.description}</p>

        {event.imageCredit && (
          <p className={styles.credit}>
            <span className={styles.creditLabel}>Image:</span> {event.imageCredit}
          </p>
        )}
      </div>
    </motion.div>
  );
}
