"use client";

import { ReactNode } from "react";
import { motion, HTMLMotionProps, Variants } from "framer-motion";

export type AnimationVariant = "fade-up" | "fade-in" | "scale-in" | "slide-in" | "stagger-container" | "stagger-item";

interface AnimatedSectionProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  variant?: AnimationVariant;
  delay?: number;
  duration?: number;
  threshold?: number | "some" | "all";
  once?: boolean;
}

const variants: Record<AnimationVariant, Variants> = {
  "fade-up": {
    hidden: { opacity: 0, y: 30 },
    visible: (custom = {}) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: custom.duration ?? 0.6,
        delay: custom.delay ?? 0,
      },
    }),
  },
  "fade-in": {
    hidden: { opacity: 0 },
    visible: (custom = {}) => ({
      opacity: 1,
      transition: {
        duration: custom.duration ?? 0.5,
        delay: custom.delay ?? 0,
      },
    }),
  },
  "scale-in": {
    hidden: { opacity: 0, scale: 0.95 },
    visible: (custom = {}) => ({
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: custom.duration ?? 0.5,
        delay: custom.delay ?? 0,
      },
    }),
  },
  "slide-in": {
    hidden: { opacity: 0, x: -30 },
    visible: (custom = {}) => ({
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: custom.duration ?? 0.5,
        delay: custom.delay ?? 0,
      },
    }),
  },
  "stagger-container": {
    hidden: { opacity: 1 },
    visible: (custom = {}) => ({
      opacity: 1,
      transition: {
        staggerChildren: custom.staggerChildren ?? 0.08,
        delayChildren: custom.delay ?? 0,
      },
    }),
  },
  "stagger-item": {
    hidden: { opacity: 0, y: 20 },
    visible: (custom = {}) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: custom.duration ?? 0.5,
      },
    }),
  },
};

export function AnimatedSection({
  children,
  variant = "fade-up",
  delay = 0,
  duration,
  threshold = "some",
  once = true,
  className,
  ...props
}: AnimatedSectionProps) {
  const custom = { delay, duration };

  // For stagger-item, let the parent trigger the animation rather than viewport observe
  if (variant === "stagger-item") {
    return (
      <motion.div
        variants={variants[variant]}
        className={className}
        custom={custom}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
      variants={variants[variant]}
      custom={custom}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
