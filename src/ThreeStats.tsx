import React, { useEffect, useRef } from 'react';
import Stats from 'three/examples/jsm/libs/stats.module.js';

const stats = Stats();
export function ThreeStats(props: {}) {
  const divRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    divRef.current?.appendChild(stats.dom);
    const updateStats = () => {
      stats.update();
      requestAnimationFrame(updateStats);
    }
    requestAnimationFrame(updateStats);
  }, []);
  return <div id='three-stats' ref={divRef} />;
}