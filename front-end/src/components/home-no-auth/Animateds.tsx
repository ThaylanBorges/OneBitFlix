"use client";

import { motion, TargetAndTransition } from "framer-motion";
import { ReactNode } from "react";

type AnimationType = "fadeUp" | "fadeRight" | "fadeZoomIn";

type AnimationState = {
  initial: TargetAndTransition;
  animate: TargetAndTransition;
};

const animations: Record<AnimationType, AnimationState> = {
  fadeUp: {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
  },
  fadeRight: {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
  },
  fadeZoomIn: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
  },
};

type AnimatedProps = {
  children: ReactNode;
  type: AnimationType;
  duration?: number;
  delay?: number;
};

export default function Animated({
  children,
  type,
  duration = 0.8,
  delay = 0,
}: AnimatedProps) {
  const { initial, animate } = animations[type];

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once: true }}
      transition={{ duration, delay }}
    >
      {children}
    </motion.div>
  );
}
