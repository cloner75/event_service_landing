'use client';

import { motion, HTMLMotionProps } from 'framer-motion';

type MotionSectionProps = HTMLMotionProps<'div'>;

export default function MotionDiv({ children, ...props }: MotionSectionProps) {
  return (
    <motion.div
      initial={{ y: '100%', opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 1.5,
        ease: 'easeOut',
        type: 'spring',
        bounce: 0.2,
        delay: 0.3,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
