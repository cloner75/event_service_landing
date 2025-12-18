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
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 1.5,
        ease: 'easeOut',
        bounce: 0.2,
        type: 'spring',
        delay: 0.3,
      }}
      {...props}
    >
      {children}
    </motion.section>
  );
}
