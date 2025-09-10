"use client";

import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

interface LazyMotionWrapperProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
}

export const LazyMotionWrapper = ({
  children,
  className = "",
  delay = 0,
  duration = 0.6,
  threshold = 0.1,
  once = true
}: LazyMotionWrapperProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once,
    margin: "-50px",
    amount: threshold
  });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
        // Reduce motion for users who prefer it
        ...(typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches && {
          duration: 0.01,
          delay: 0
        })
      }}
    >
      {children}
    </motion.div>
  );
};

export const LazyFadeIn = ({
  children,
  className = "",
  delay = 0,
  duration = 0.4
}: Omit<LazyMotionWrapperProps, 'threshold' | 'once'>) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{
        duration,
        delay,
        ease: "easeOut",
        ...(typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches && {
          duration: 0.01,
          delay: 0
        })
      }}
    >
      {children}
    </motion.div>
  );
};
