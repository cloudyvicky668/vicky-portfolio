'use client'

import { motion } from 'framer-motion'

export default function Outro() {
  return (
    <section className="h-screen w-full bg-[#131A14] flex flex-col items-center justify-center relative overflow-hidden transition-colors duration-1000">
      {/* 背景纹理 */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 80%, rgba(100, 150, 100, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 80% 20%, rgba(80, 120, 80, 0.08) 0%, transparent 40%)`
        }}
      />

      {/* 诗句 */}
      <motion.div
        initial={{ opacity: 0, filter: 'blur(12px)' }}
        whileInView={{ opacity: 1, filter: 'blur(0px)' }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="text-center relative z-10"
      >
        <p className="text-white/90 text-2xl md:text-3xl lg:text-4xl font-light tracking-[0.3em] mb-4 leading-relaxed"
           style={{ fontFamily: 'serif' }}>
          海压竹枝低复举，
        </p>
        <p className="text-white/90 text-2xl md:text-3xl lg:text-4xl font-light tracking-[0.3em] leading-relaxed"
           style={{ fontFamily: 'serif' }}>
          风吹山角晦还明。
        </p>
      </motion.div>

      {/* 落款 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: 'easeOut', delay: 1 }}
        className="relative z-10 mt-[60px]"
      >
        <p className="text-neutral-500/60 text-xs tracking-widest">
          谢谢你读到这里，我是 Vicky。
        </p>
      </motion.div>

      {/* 底部装饰线 */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: 'easeOut', delay: 1.5 }}
        className="absolute bottom-20 w-24 h-px bg-neutral-500/20 origin-left"
      />
    </section>
  )
}
