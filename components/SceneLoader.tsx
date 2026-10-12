'use client';

import dynamic from 'next/dynamic';
import { Scale } from 'lucide-react';

const ThreeScene = dynamic(() => import('@/components/ThreeScene'), {
  ssr: false,
  loading: () => (
    <div className="scene-fallback" aria-label="Loading interactive illustration">
      <Scale size={72} strokeWidth={0.8} />
    </div>
  ),
});

export default function SceneLoader() {
  return <ThreeScene />;
}
