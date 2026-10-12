'use client';

import { useEffect } from 'react';

export default function InteractionEffects() {
  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || reducedMotion) return;

    const cursor = document.createElement('div');
    cursor.className = 'cursor-accent';
    cursor.setAttribute('aria-hidden', 'true');
    document.body.appendChild(cursor);
    let raf = 0;
    let x = -100;
    let y = -100;
    const move = (event: MouseEvent) => {
      x = event.clientX;
      y = event.clientY;
      if (!raf) raf = window.requestAnimationFrame(() => {
        cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        raf = 0;
      });
    };
    const interactive = (event: Event) => {
      const target = event.target as Element | null;
      cursor.classList.toggle('cursor-active', !!target?.closest('a, button, [data-magnetic]'));
    };
    window.addEventListener('mousemove', move, { passive: true });
    document.addEventListener('pointerover', interactive, { passive: true });

    const magneticItems = Array.from(document.querySelectorAll<HTMLElement>('[data-magnetic], [data-magnetic-card]'));
    const cleanups = magneticItems.map((item) => {
      const onMove = (event: MouseEvent) => {
        const rect = item.getBoundingClientRect();
        const dx = event.clientX - (rect.left + rect.width / 2);
        const dy = event.clientY - (rect.top + rect.height / 2);
        const isCard = item.hasAttribute('data-magnetic-card');
        const strength = isCard ? 0.018 : 0.075;
        item.style.setProperty('--mag-x', `${dx * strength}px`);
        item.style.setProperty('--mag-y', `${dy * (isCard ? 0.022 : 0.085)}px`);
      };
      const onLeave = () => {
        item.style.setProperty('--mag-x', '0px');
        item.style.setProperty('--mag-y', '0px');
      };
      item.addEventListener('mousemove', onMove, { passive: true });
      item.addEventListener('mouseleave', onLeave, { passive: true });
      return () => {
        item.removeEventListener('mousemove', onMove);
        item.removeEventListener('mouseleave', onLeave);
      };
    });
    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('pointerover', interactive);
      cleanups.forEach((cleanup) => cleanup());
      if (raf) window.cancelAnimationFrame(raf);
      cursor.remove();
    };
  }, []);
  return null;
}
