import { motion } from 'framer-motion';
import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import type { AnimatedEvent } from '../data/animatedEvents';
import type { CinematicSceneSpec, SceneAccentPreset, SceneLayer } from '../types/scene';
import { DrawPath, DustMote, Flame, LaurelSprig } from '../illustrations/shared';
import styles from './CinematicScene.module.css';

interface CinematicSceneProps {
  event: AnimatedEvent;
  spec: CinematicSceneSpec;
  fallback: ReactNode;
  prefersReducedMotion: boolean;
}

export function CinematicScene({
  event,
  spec,
  fallback,
  prefersReducedMotion,
}: CinematicSceneProps) {
  const [hasAssetError, setHasAssetError] = useState(false);

  useEffect(() => {
    setHasAssetError(false);
  }, [event.id, spec]);

  if (hasAssetError || spec.layers.length === 0) {
    return <div className={styles.fallback}>{fallback}</div>;
  }

  return (
    <div className={styles.root} aria-label={`${event.title} cinematic scene`} role="img">
      <motion.div
        className={styles.camera}
        animate={
          prefersReducedMotion
            ? { x: 0, y: 0, scale: 1 }
            : {
                x: [0, spec.camera.driftX * 0.45, 0],
                y: [0, spec.camera.driftY * 0.45, 0],
                scale: [spec.camera.zoomFrom, spec.camera.zoomTo, spec.camera.zoomFrom],
              }
        }
        transition={
          prefersReducedMotion
            ? { duration: 0.2 }
            : {
                duration: 22,
                ease: 'easeInOut',
                repeat: Infinity,
              }
        }
      >
        {spec.layers.map((layer, index) => (
          <LayerImage
            key={`${event.id}-${layer.id}`}
            layer={layer}
            index={index}
            reducedMotion={prefersReducedMotion}
            camera={spec.camera}
            onLayerError={() => setHasAssetError(true)}
          />
        ))}
      </motion.div>

      <div className={styles.atmosphere} />
      <div className={styles.vignette} />
      <div className={styles.grain} />
      <AccentOverlay
        eventId={event.id}
        preset={spec.accentPreset}
        intensity={spec.accentIntensity ?? 0.68}
        reducedMotion={prefersReducedMotion}
      />
    </div>
  );
}

interface LayerImageProps {
  layer: SceneLayer;
  index: number;
  reducedMotion: boolean;
  camera: CinematicSceneSpec['camera'];
  onLayerError: () => void;
}

function LayerImage({
  layer,
  index,
  reducedMotion,
  camera,
  onLayerError,
}: LayerImageProps) {
  const travelX = camera.driftX * layer.parallax;
  const travelY = camera.driftY * layer.parallax;
  const layerStyle = {
    zIndex: index + 1,
    mixBlendMode: layer.blendMode ?? 'normal',
    opacity: layer.opacity,
  } as CSSProperties;

  return (
    <motion.img
      src={layer.src}
      alt=""
      aria-hidden="true"
      className={styles.layer}
      style={layerStyle}
      initial={reducedMotion ? false : { opacity: 0, scale: 1.02 }}
      animate={
        reducedMotion
          ? { opacity: layer.opacity, x: 0, y: 0, scale: 1 }
          : {
              opacity: layer.opacity,
              x: [0, travelX, 0],
              y: [0, travelY, 0],
              scale: [1, 1 + layer.parallax * 0.014, 1],
            }
      }
      transition={
        reducedMotion
          ? { duration: 0.2 }
          : {
              duration: 16 + index * 4,
              ease: 'easeInOut',
              repeat: Infinity,
              opacity: { duration: 0.5, delay: index * 0.08, repeat: 0 },
            }
      }
      onError={onLayerError}
      decoding="async"
      loading="eager"
      draggable={false}
    />
  );
}

function AccentOverlay({
  eventId,
  preset,
  intensity,
  reducedMotion,
}: {
  eventId: string;
  preset: SceneAccentPreset;
  intensity: number;
  reducedMotion: boolean;
}) {
  if (preset === 'none') return null;
  const opacity = Math.max(0.12, Math.min(1, intensity));
  const accentStyle = { opacity } as const;

  if (preset === 'embers') {
    return (
      <svg
        viewBox="0 0 1920 1080"
        preserveAspectRatio="none"
        className={styles.accentLayer}
        style={accentStyle}
        aria-hidden="true"
      >
        {reducedMotion ? (
          <>
            <StaticFlame cx={330} cy={920} scale={1.15} />
            <StaticFlame cx={1560} cy={920} scale={1.15} />
          </>
        ) : (
          <>
            <Flame cx={330} cy={920} scale={1.15} delay={0} />
            <Flame cx={1560} cy={920} scale={1.15} delay={0.3} />
          </>
        )}
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <DustMote
            key={i}
            cx={260 + i * 220}
            cy={880 - (i % 3) * 42}
            r={2 + (i % 2)}
            color="#D4845A"
            delay={i * 0.3}
            reducedMotion={reducedMotion}
          />
        ))}
      </svg>
    );
  }

  if (preset === 'laurel') {
    return (
      <svg
        viewBox="0 0 1920 1080"
        preserveAspectRatio="none"
        className={styles.accentLayer}
        style={accentStyle}
        aria-hidden="true"
      >
        <DrawPath
          d="M710,170 Q960,80 1210,170"
          stroke="#B8860B"
          strokeWidth={2}
          delay={0.2}
          duration={1}
        />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <LaurelSprig
            key={`left-${i}`}
            x={760 + i * 36}
            y={175 - i * 7}
            scale={0.85}
            delay={0.3 + i * 0.06}
          />
        ))}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <g key={`right-${i}`} transform={`scale(-1 1) translate(${-1160 - i * 36} ${175 - i * 7})`}>
            <LaurelSprig x={0} y={0} scale={0.85} delay={0.3 + i * 0.06} />
          </g>
        ))}
        {[0, 1, 2, 3, 4].map((i) => (
          <DustMote
            key={i}
            cx={860 + i * 54}
            cy={125 + (i % 2) * 16}
            r={2}
            color="#E8C99B"
            delay={i * 0.2}
            reducedMotion={reducedMotion}
          />
        ))}
      </svg>
    );
  }

  if (preset === 'steel-glint') {
    const gradientId = `steel-glint-${eventId}`;
    return (
      <svg
        viewBox="0 0 1920 1080"
        preserveAspectRatio="none"
        className={styles.accentLayer}
        style={accentStyle}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E8C99B" stopOpacity="0" />
            <stop offset="50%" stopColor="#E8C99B" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#E8C99B" stopOpacity="0" />
          </linearGradient>
        </defs>
        {reducedMotion ? (
          <rect x="640" y="430" width="640" height="5" fill={`url(#${gradientId})`} />
        ) : (
          <motion.rect
            x="-420"
            y="430"
            width="640"
            height="5"
            fill={`url(#${gradientId})`}
            animate={{ x: [-420, 1920] }}
            transition={{ duration: 4.8, repeat: Infinity, repeatDelay: 2.2, ease: 'easeInOut' }}
          />
        )}
        <DrawPath
          d="M500,700 H1420"
          stroke="#B8860B"
          strokeWidth={1.5}
          delay={0.4}
          duration={0.9}
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 1920 1080"
      preserveAspectRatio="none"
      className={styles.accentLayer}
      style={accentStyle}
      aria-hidden="true"
    >
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <DustMote
          key={i}
          cx={240 + i * 180}
          cy={170 + (i % 3) * 140}
          r={2}
          color="#E8C99B"
          delay={i * 0.22}
          reducedMotion={reducedMotion}
        />
      ))}
    </svg>
  );
}

function StaticFlame({ cx, cy, scale = 1 }: { cx: number; cy: number; scale?: number }) {
  return (
    <g transform={`translate(${cx}, ${cy}) scale(${scale})`} opacity="0.72">
      <path d="M0,-20 Q8,-12 4,0 Q0,8 -4,0 Q-8,-12 0,-20Z" fill="#D4845A" />
      <path d="M0,-14 Q5,-8 3,0 Q0,5 -3,0 Q-5,-8 0,-14Z" fill="#E8C99B" />
    </g>
  );
}
