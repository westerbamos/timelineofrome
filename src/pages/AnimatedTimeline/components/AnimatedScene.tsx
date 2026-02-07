import { motion } from 'framer-motion';
import type { AnimatedEvent } from '../data/animatedEvents';
import { getSceneSpec } from '../data/sceneSpecs';
import { illustrations } from '../illustrations';
import { CinematicScene } from './CinematicScene';
import type { SceneAssetVersion } from '../types/scene';
import styles from './AnimatedScene.module.css';

interface AnimatedSceneProps {
  event: AnimatedEvent;
  direction: number;
  prefersReducedMotion: boolean;
  sceneVersion?: SceneAssetVersion;
}

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 1.05,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
    scale: 0.95,
  }),
};

export function AnimatedScene({
  event,
  direction,
  prefersReducedMotion,
  sceneVersion,
}: AnimatedSceneProps) {
  const sceneSpec = getSceneSpec(event.id, { version: sceneVersion });
  const fallbackKey = sceneSpec.fallbackIllustrationKey ?? event.id;
  const LegacyIllustration = illustrations[fallbackKey];

  const fallbackScene = LegacyIllustration
    ? <LegacyIllustration />
    : <DefaultScene title={event.title} />;

  const Illustration = illustrations[event.id];

  return (
    <motion.div
      className={styles.scene}
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
      }}
    >
      <div className={styles.illustrationWrapper}>
        {sceneSpec.renderMode === 'cinematic-hybrid' ? (
          <CinematicScene
            event={event}
            spec={sceneSpec}
            fallback={fallbackScene}
            prefersReducedMotion={prefersReducedMotion}
          />
        ) : Illustration ? (
          <Illustration />
        ) : (
          <DefaultScene title={event.title} />
        )}
      </div>
    </motion.div>
  );
}

function DefaultScene({ title }: { title: string }) {
  return (
    <svg
      viewBox="0 0 1920 1080"
      preserveAspectRatio="xMidYMid slice"
      className={styles.svg}
    >
      <rect width="1920" height="1080" fill="var(--pottery-black, #1A1008)" />
      <text
        x="960"
        y="540"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="var(--pottery-terracotta, #C65D3E)"
        fontFamily="Cinzel, serif"
        fontSize="48"
        opacity="0.3"
      >
        {title}
      </text>
    </svg>
  );
}
