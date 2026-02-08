import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { trackAnalyticsEvent } from '../../lib/analytics';
import type { TimelineEvent } from '../../types';
import { EventDetail } from '../EventDetail/EventDetail';
import styles from './TimelineEvent.module.css';

interface TimelineEventProps {
  event: TimelineEvent;
  index: number;
}

export function TimelineEventComponent({ event, index }: TimelineEventProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isMajor = event.significance === 'major';
  const handleToggleExpand = () => {
    setIsExpanded((previouslyExpanded) => {
      const nextExpanded = !previouslyExpanded;
      if (nextExpanded) {
        trackAnalyticsEvent('timeline_event_expand', {
          event_id: event.id,
          event_title: event.title,
          event_era: event.era,
          event_year: event.year,
          event_significance: event.significance,
        });
      }
      return nextExpanded;
    });
  };

  return (
    <motion.article
      id={`event-${event.id}`}
      className={`${styles.event} ${isMajor ? styles.major : styles.minor}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      {/* Timeline dot */}
      <div className={styles.dot} aria-hidden="true">
        <span className={styles.dotInner} />
      </div>

      {/* Year badge */}
      <div className={styles.yearBadge}>
        <span className={styles.year}>{event.yearDisplay}</span>
      </div>

      {/* Card */}
      <motion.div
        className={styles.card}
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
      >
        <button
          className={styles.cardButton}
          onClick={handleToggleExpand}
          aria-expanded={isExpanded}
          aria-controls={`event-detail-${event.id}`}
        >
          {/* Image for major events */}
          {isMajor && event.imageUrl && (
            <div className={styles.imageWrapper}>
              <img
                src={event.imageUrl}
                alt={event.imageAlt || event.title}
                className={styles.image}
                loading="lazy"
              />
              <div className={styles.imageOverlay} />
            </div>
          )}

          <div className={styles.content}>
            <h3 className={styles.title}>
              <a href={`#event-${event.id}`} className={styles.permalink}>
                {event.title}
              </a>
            </h3>
            <p className={styles.summary}>{event.summary}</p>

            <span className={styles.expandHint}>
              {isExpanded ? 'Click to collapse' : 'Click to read more'}
              <ExpandIcon isExpanded={isExpanded} />
            </span>
          </div>
        </button>

        <AnimatePresence>
          {isExpanded && (
            <EventDetail
              id={`event-detail-${event.id}`}
              event={event}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </motion.article>
  );
}

function ExpandIcon({ isExpanded }: { isExpanded: boolean }) {
  return (
    <motion.svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className={styles.expandIcon}
      animate={{ rotate: isExpanded ? 180 : 0 }}
      transition={{ duration: 0.2 }}
    >
      <path
        d="M4 6L8 10L12 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.svg>
  );
}
