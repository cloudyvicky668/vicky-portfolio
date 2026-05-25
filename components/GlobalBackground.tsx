'use client'

import { motion } from 'framer-motion'

export default function GlobalBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none">
      
      {/* 全局亚麻布纹理背景 */}
      <div 
        className="absolute inset-0" 
        style={{ 
          backgroundColor: 'var(--color-bg-cream-light)', 
          backgroundImage: ` 
            linear-gradient(90deg, var(--color-grid-line) 1px, transparent 1px), 
            linear-gradient(var(--color-grid-line) 1px, transparent 1px) 
          `, 
          backgroundSize: '16px 16px' 
        }} 
      />

      {/* 全局微噪点 */}
      <div 
        className="absolute inset-0 mix-blend-overlay opacity-[0.12]" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` 
        }} 
      />

    </div>
  )
}
