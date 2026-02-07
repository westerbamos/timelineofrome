import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

/** Reusable Greek key / meander border pattern */
export function MeanderBorder() {
  return (
    <g opacity="0.35">
      {/* Top border */}
      <motion.path
        d="M0,30 h1920"
        stroke="#C65D3E"
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
      />
      <motion.path
        d="M0,35 h30 v10 h-20 v-5 h10 M40,35 h30 v10 h-20 v-5 h10 M80,35 h30 v10 h-20 v-5 h10 M120,35 h30 v10 h-20 v-5 h10 M160,35 h30 v10 h-20 v-5 h10 M200,35 h30 v10 h-20 v-5 h10 M240,35 h30 v10 h-20 v-5 h10 M280,35 h30 v10 h-20 v-5 h10 M320,35 h30 v10 h-20 v-5 h10 M360,35 h30 v10 h-20 v-5 h10"
        stroke="#C65D3E"
        strokeWidth="1.5"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, delay: 0.3 }}
      />
      {/* Bottom border */}
      <motion.path
        d="M0,1050 h1920"
        stroke="#C65D3E"
        strokeWidth="2"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
      />
      <motion.path
        d="M0,1040 h30 v-10 h-20 v5 h10 M40,1040 h30 v-10 h-20 v5 h10 M80,1040 h30 v-10 h-20 v5 h10 M120,1040 h30 v-10 h-20 v5 h10 M160,1040 h30 v-10 h-20 v5 h10 M200,1040 h30 v-10 h-20 v5 h10 M240,1040 h30 v-10 h-20 v5 h10 M280,1040 h30 v-10 h-20 v5 h10 M320,1040 h30 v-10 h-20 v5 h10 M360,1040 h30 v-10 h-20 v5 h10"
        stroke="#C65D3E"
        strokeWidth="1.5"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, delay: 0.3 }}
      />
    </g>
  );
}

/** Wrapper SVG with pottery black background */
export function PotteryScene({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 1920 1080"
      preserveAspectRatio="xMidYMid slice"
      style={{ width: '100%', height: '100%', display: 'block' }}
    >
      <rect width="1920" height="1080" fill="#1A1008" />
      <MeanderBorder />
      {children}
    </svg>
  );
}

/** Animated path that draws on with stroke-dasharray */
export function DrawPath({
  d,
  stroke = '#C65D3E',
  strokeWidth = 3,
  fill = 'none',
  delay = 0,
  duration = 1.2,
  ...rest
}: {
  d: string;
  stroke?: string;
  strokeWidth?: number;
  fill?: string;
  delay?: number;
  duration?: number;
  [key: string]: unknown;
}) {
  return (
    <motion.path
      d={d}
      stroke={stroke}
      strokeWidth={strokeWidth}
      fill={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration, delay, ease: 'easeInOut' }}
      {...rest}
    />
  );
}

/** Animated filled shape that fades in */
export function FadeShape({
  children,
  delay = 0,
  duration = 0.8,
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
}) {
  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration, delay }}
    >
      {children}
    </motion.g>
  );
}

/** Staggered group with sequential reveal */
export function StaggerGroup({
  children,
  stagger = 0.15,
  delay = 0,
}: {
  children: ReactNode;
  stagger?: number;
  delay?: number;
}) {
  return (
    <motion.g
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren: delay,
          },
        },
      }}
    >
      {children}
    </motion.g>
  );
}

/** Child of StaggerGroup that fades/slides in */
export function StaggerChild({ children }: { children: ReactNode }) {
  return (
    <motion.g
      variants={{
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
      }}
    >
      {children}
    </motion.g>
  );
}

/** Flickering flame effect */
export function Flame({
  cx,
  cy,
  scale = 1,
  delay = 0,
}: {
  cx: number;
  cy: number;
  scale?: number;
  delay?: number;
}) {
  return (
    <motion.g transform={`translate(${cx}, ${cy}) scale(${scale})`}>
      <motion.path
        d="M0,-20 Q8,-12 4,0 Q0,8 -4,0 Q-8,-12 0,-20Z"
        fill="#D4845A"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0.6, 1, 0.7, 1, 0.6],
          y: [0, -3, -1, -4, 0],
          scaleY: [1, 1.1, 0.95, 1.05, 1],
        }}
        transition={{
          duration: 1.5,
          delay,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.path
        d="M0,-14 Q5,-8 3,0 Q0,5 -3,0 Q-5,-8 0,-14Z"
        fill="#E8C99B"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0.4, 0.8, 0.5, 0.7, 0.4],
          y: [0, -2, 0, -3, 0],
        }}
        transition={{
          duration: 1.2,
          delay: delay + 0.2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.g>
  );
}

/** Ambient mote used in cinematic overlays */
export function DustMote({
  cx,
  cy,
  r = 2,
  color = '#E8C99B',
  delay = 0,
  reducedMotion = false,
}: {
  cx: number;
  cy: number;
  r?: number;
  color?: string;
  delay?: number;
  reducedMotion?: boolean;
}) {
  if (reducedMotion) {
    return <circle cx={cx} cy={cy} r={r} fill={color} opacity="0.3" />;
  }

  return (
    <motion.circle
      cx={cx}
      cy={cy}
      r={r}
      fill={color}
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0.1, 0.55, 0.2, 0.1],
        cx: [cx, cx + 8, cx + 3, cx],
        cy: [cy, cy - 18, cy - 8, cy],
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

/** Laurel accent that can be layered over cinematic scenes */
export function LaurelSprig({
  x,
  y,
  scale = 1,
  delay = 0,
  color = '#B8860B',
}: {
  x: number;
  y: number;
  scale?: number;
  delay?: number;
  color?: string;
}) {
  return (
    <motion.g
      transform={`translate(${x}, ${y}) scale(${scale})`}
      initial={{ opacity: 0, rotate: -6 }}
      animate={{ opacity: 1, rotate: 0 }}
      transition={{ duration: 0.8, delay }}
    >
      <DrawPath d="M0,0 Q12,-30 26,-56" stroke={color} strokeWidth={2} delay={delay} duration={0.9} />
      {[
        { x: -4, y: -8, w: 9, h: 4, r: -20 },
        { x: 4, y: -18, w: 10, h: 4, r: 15 },
        { x: -1, y: -29, w: 10, h: 4, r: -18 },
        { x: 8, y: -40, w: 11, h: 4, r: 16 },
        { x: 4, y: -50, w: 9, h: 4, r: -12 },
      ].map((leaf, index) => (
        <motion.ellipse
          key={index}
          cx={leaf.x}
          cy={leaf.y}
          rx={leaf.w}
          ry={leaf.h}
          fill={color}
          transform={`rotate(${leaf.r} ${leaf.x} ${leaf.y})`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: delay + 0.18 + index * 0.05, duration: 0.45 }}
        />
      ))}
    </motion.g>
  );
}
