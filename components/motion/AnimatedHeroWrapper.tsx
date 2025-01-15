'use client';

import type React from 'react';
import type { ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface AnimatedHeroWrapperProps {
  children: ReactNode;
}

const AnimatedHeroWrapper: React.FC<AnimatedHeroWrapperProps> = ({ children }) => {
  const { scrollYProgress } = useScroll();

  // Tilt effect transformation
  const tilt = useTransform(scrollYProgress, [0.1, 1], [0, 18]); // Max tilt: 14 degrees
   // Parallax background movement
 const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <motion.div
      style={{
        rotateZ: tilt, // Apply rotation
        transformOrigin: 'bottom right', // Rotation anchor at bottom right
        willChange: 'transform', // Optimize performance for animations
		  y: backgroundY,
      }}
      className="relative"
    >
      {/* Child content remains unaffected */}
      {children}
    </motion.div>
  );
};

export default AnimatedHeroWrapper;
