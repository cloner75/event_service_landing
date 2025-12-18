'use client';

import { motion, HTMLMotionProps } from 'framer-motion';

type MotionSectionProps = HTMLMotionProps<'section'>;

export default function MotionSection({
  children,
  ...props
}: MotionSectionProps) {
  return (
    <motion.section
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
    </motion.section>
  );
}
