import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import type { AnimatedEvent } from '../data/animatedEvents';
import styles from './SceneOverlay.module.css';

interface SceneOverlayProps {
  event: AnimatedEvent;
  isExpanded: boolean;
  onToggleExpanded: () => void;
}

export function SceneOverlay({ event, isExpanded, onToggleExpanded }: SceneOverlayProps) {
  const prefersReducedMotion = useReducedMotion();
  const detailsId = `scene-details-${event.id}`;
  const wrapperEase: [number, number, number, number] = [0.22, 1, 0.36, 1];
  const contentEase: [number, number, number, number] = [0.4, 0, 0.2, 1];

  const wrapperExpandDuration = prefersReducedMotion ? 0.01 : 0.32;
  const wrapperCollapseDuration = prefersReducedMotion ? 0.01 : 0.3;
  const contentExpandDuration = prefersReducedMotion ? 0.01 : 0.2;
  const contentCollapseDuration = prefersReducedMotion ? 0.01 : 0.16;
  const contentExpandDelay = prefersReducedMotion ? 0 : 0.06;
  const contentCollapseDelay = prefersReducedMotion ? 0 : 0.05;

  return (
    <motion.div
      className={`${styles.overlay} ${isExpanded ? styles.overlayExpanded : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <span className={styles.year}>{event.yearDisplay}</span>
      <h2 className={styles.title}>{event.title}</h2>
      <p className={styles.summary}>{event.summary}</p>
      <button
        type="button"
        className={styles.readMoreButton}
        onClick={onToggleExpanded}
        aria-expanded={isExpanded}
        aria-controls={detailsId}
      >
        {isExpanded ? 'Hide details' : 'Read more'}
      </button>

      <AnimatePresence initial={false}>
        {isExpanded ? (
          <motion.div
            id={detailsId}
            className={styles.detailsWrapper}
            initial={{ height: 0 }}
            animate={{
              height: 'auto',
              transition: { duration: wrapperExpandDuration, ease: wrapperEase },
            }}
            exit={{
              height: 0,
              transition: { duration: wrapperCollapseDuration, ease: wrapperEase },
            }}
          >
            <div className={styles.detailsSpacer} aria-hidden="true" />
            <motion.div
              className={styles.detailsPanel}
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 6 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  duration: contentExpandDuration,
                  delay: contentExpandDelay,
                  ease: contentEase,
                },
              }}
              exit={{
                opacity: 0,
                y: prefersReducedMotion ? 0 : -2,
                transition: {
                  duration: contentCollapseDuration,
                  delay: contentCollapseDelay,
                  ease: contentEase,
                },
              }}
            >
              <p className={styles.description}>{event.description}</p>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}
