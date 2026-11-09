'use client';
import { motion, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';

export default function Reveal({ children, className = '', delay = 0, heading = false }: { children: ReactNode; className?: string; delay?: number; heading?: boolean }) {
  const reduce = useReducedMotion();
  return <motion.div className={`${className}${heading ? ' heading-reveal' : ''}`}
onViewportEnter={(entry) => {
  if (heading) {
    entry?.target && (entry.target as HTMLElement).classList.add('is-visible');
  }
}}

 initial={reduce ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.16 }} transition={{ duration: reduce ? 0 : 0.7, ease: [0.22, 1, 0.36, 1], delay }}>{children}</motion.div>;
}
