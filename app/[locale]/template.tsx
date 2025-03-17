"use client";

import { motion } from "motion/react";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ x: "-100vw", y: "-100vw", rotate: 14, opacity: 1 }}
      animate={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
      exit={{ x: "100vw", y: "-100vw", opacity: 1, rotate: 14 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}
