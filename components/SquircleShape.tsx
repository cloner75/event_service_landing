'use client';
import { motion } from 'framer-motion';

import { Squircle } from 'corner-smoothing';

type SquircleShapeProps = {
  cornerRadius?: number;
  topLeftCornerRadius?: number;
  topRightCornerRadius?: number;
  bottomLeftCornerRadius?: number;
  bottomRightCornerRadius?: number;
  additionalclasses?: string;
  children?: React.ReactNode;
  withMotion?: boolean;
  style?: any;
};

export default function SquircleShape({
  children,
  withMotion = false,
  ...props
}: SquircleShapeProps) {
  return (
    <Squircle
      className={props.additionalclasses ?? ''}
      cornerRadius={props.cornerRadius ?? 0}
      {...props}
    >
      {withMotion ? (
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 1,
            ease: 'easeOut',
            bounce: 0.35,
            type: 'spring',
            delay: 0.3,
          }}
        >
          {children ?? ''}
        </motion.div>
      ) : (
        children ?? ''
      )}
    </Squircle>
  );
}
