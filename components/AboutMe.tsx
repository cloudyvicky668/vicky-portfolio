'use client'

import { motion } from 'framer-motion'
import SecretEggTheater from './SecretEggTheater'
import Image from 'next/image'

// 音频波形动画组件
const AudioWave = ({ length, color }: { length: number; color: string }) => {
  const bars = Array.from({ length: Math.max(length, 10) }, (_, i) => {
    const height = Math.random() * 16 + 4
    const opacity = 0.3 + (height / 20) * 0.7 // 根据高度变化透明度，实现渐变效果
    return (
      <motion.div
        key={i}
        className="rounded-full"
        style={{
          width: '3px',
          height: `${height}px`,
          background: `linear-gradient(to top, ${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')}, ${color}40)`,
        }}
        animate={{
          height: [
            `${Math.random() * 12 + 4}px`,
            `${Math.random() * 16 + 4}px`,
            `${Math.random() * 10 + 6}px`,
            `${Math.random() * 14 + 4}px`,
          ],
        }}
        transition={{
          duration: 1.5 + Math.random(),
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    )
  })

  return <div className="flex items-end gap-0.5 h-5">{bars}</div>
}

export default function AboutMe() {
  return (
    <section id="about" className="py-16 px-6 md:px-12 lg:px-20 min-h-screen paper-texture about-me-bg">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* 左侧列：图片 + 四通道整合系统 */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-4"
          >
            {/* 氛围感肖像 */}
            <div className="relative mb-8" style={{ width: '85%' }}>
              <svg 
                className="absolute inset-0 w-full h-full -top-3 -left-3 -right-3 -bottom-3 pointer-events-none z-10" 
                viewBox="0 0 400 500"
                preserveAspectRatio="none"
              >
                <defs>
                  <filter id="roughFilter">
                    <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" result="noise"/>
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G"/>
                  </filter>
                </defs>
                <path 
                  d="M25,40 Q10,20 40,10 L90,8 Q130,2 170,8 L210,12 Q250,16 290,10 L330,6 Q370,2 380,25 L390,70 Q398,120 392,170 L386,220 Q380,270 374,320 L368,370 Q362,420 352,460 L338,485 Q310,498 270,492 L230,486 Q190,480 150,486 L110,492 Q70,498 45,475 L28,435 Q18,385 24,335 L30,285 Q36,235 30,185 L24,135 Q18,85 24,45 Z"
                  fill="none" 
                  stroke="#B8C96E" 
                  strokeWidth="4" 
                  strokeLinecap="round"
                  filter="url(#roughFilter)"
                />
              </svg>
              <div className="relative w-full aspect-[4/5] overflow-hidden" style={{ transform: 'rotate(-1deg)' }}>
                <Image
                  src="/images/vicky.webp"
                  alt="Vicky Portrait"
                  fill
                  priority
                  placeholder="blur"
                  blurDataURL="data:image/webp;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2teleQHmAKbk2teleQHmAKbk2teleQHmAKbk2teleQHmAKbk2teleQHmAKbk2teleQHmAKbk2teleQHmAKbk2teleQHmAKbk2teleQHmAKbk2teleQHmAKbk2teleQHmAKbk2teleQHmAKbk2tel"
                  className="object-cover relative z-0"
                />
              </div>
            </div>

            {/* 四通道整合系统 - 放到图片下方 */}
            <div className="rounded-lg p-5 about-card">
              <h3 className="font-serif text-base font-semibold text-neutral-700 mb-3">[ 四通道整合系统 ]</h3>
              <p className="font-light text-xs text-neutral-500 mb-4">aesthetic intuition × content creation × information filtration × user connection</p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 group">
                  <AudioWave length={4} color="#8BB8E8" />
                  <div className="relative">
                    <span 
                      className="text-neutral-700"
                      style={{ 
                        fontFamily: 'tegaki, sans-serif',
                        fontSize: '19.8px'
                      }}
                    >
                      审美直觉
                    </span>
                    <div className="absolute -bottom-1 left-0 w-[200%] h-px bg-neutral-300/50 overflow-hidden">
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent w-full h-full"
                        initial={{ x: '-100%', opacity: 0 }}
                        whileHover={{ x: '200%', opacity: 1 }}
                        transition={{ duration: 0.8, ease: 'easeInOut' }}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 group">
                  <AudioWave length={4} color="#E5AEA8" />
                  <div className="relative">
                    <span 
                      className="text-neutral-700"
                      style={{ 
                        fontFamily: 'tegaki, sans-serif',
                        fontSize: '19.8px'
                      }}
                    >
                      内容创造
                    </span>
                    <div className="absolute -bottom-1 left-0 w-[200%] h-px bg-neutral-300/50 overflow-hidden">
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent w-full h-full"
                        initial={{ x: '-100%', opacity: 0 }}
                        whileHover={{ x: '200%', opacity: 1 }}
                        transition={{ duration: 0.8, ease: 'easeInOut' }}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 group">
                  <AudioWave length={4} color="#E5D09A" />
                  <div className="relative">
                    <span 
                      className="text-neutral-700"
                      style={{ 
                        fontFamily: 'tegaki, sans-serif',
                        fontSize: '19.8px'
                      }}
                    >
                      信息过滤
                    </span>
                    <div className="absolute -bottom-1 left-0 w-[200%] h-px bg-neutral-300/50 overflow-hidden">
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent w-full h-full"
                        initial={{ x: '-100%', opacity: 0 }}
                        whileHover={{ x: '200%', opacity: 1 }}
                        transition={{ duration: 0.8, ease: 'easeInOut' }}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 group">
                  <AudioWave length={4} color="#9FC4A8" />
                  <div className="relative">
                    <span 
                      className="text-neutral-700"
                      style={{ 
                        fontFamily: 'tegaki, sans-serif',
                        fontSize: '19.8px'
                      }}
                    >
                      用户连接
                    </span>
                    <div className="absolute -bottom-1 left-0 w-[200%] h-px bg-neutral-300/50 overflow-hidden">
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent w-full h-full"
                        initial={{ x: '-100%', opacity: 0 }}
                        whileHover={{ x: '200%', opacity: 1 }}
                        transition={{ duration: 0.8, ease: 'easeInOut' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 右侧列：ABOUT ME + VICKY + 经历 + 我的愿景（滚动容器） */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="lg:col-span-8"
          >
            {/* 大标题 ABOUT ME - 放大到原来的两倍 */}
            <h2 
              className="font-architects text-[48px] md:text-[56px] lg:text-[64px] font-semibold uppercase tracking-[0.15em] text-[#1D1D1D] mb-4"
            >
              ABOUT ME
            </h2>
            
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-neutral-800 mb-2 tracking-tight">
              VICKY
            </h1>
            <p className="text-neutral-600 tracking-wide mb-2">审美驱动的品牌内容创作者</p>
            
            {/* 经历与现状 */}
            <p className="font-light text-sm text-neutral-700 mb-8 leading-relaxed">
              过去 8 年在美妆和快消行业做营销。<br />
              现在同时在做手作饰品品牌和内容创作。
            </p>
            
            <div className="border-t about-divider my-8"></div>
            
            {/* 我的愿景部分 - 上移至原本四通道的位置，滚轮容器底部与左侧图片底部对齐 */}
            <div 
              className="space-y-6 pr-2"
              style={{ 
                maxHeight: '450px', 
                overflowY: 'auto',
                scrollbarWidth: 'thin',
                scrollbarColor: '#C4A77D #F2EDE4'
              }}
            >
              <div>
                <h3 className="font-serif text-lg font-semibold text-neutral-700 mb-3">[ 我的愿景 ]</h3>
                <p className="font-light text-sm leading-loose">
                  过去 8 年，我操盘过小红书从 0 到 8000 粉的账号，也投放过 ROI 极高的爆款项目。<br /><br />
                  但我越来越清楚，我真正想做的不是“完成 KPI”，<br />
                  而是用有温度的内容，连接品牌和真正在意的人。<br /><br />
                  我不想做那些只为数据好看的内容，也不想成为流水线上的内容制造者。<br />
                  <span className="text-[#C47A5B] font-medium">我相信，好内容不只是完成 KPI 的工具，它能真正影响人、打动人、改变人。</span>
                </p>
              </div>

              <div className="border-t about-divider my-8"></div>

              <div>
                <h3 className="font-serif text-lg font-semibold text-neutral-700 mb-3">[ 创造本能 ]</h3>
                <p className="font-light text-sm leading-loose">
                  我做手作饰品，画插画，写旅行内容，拍照片 ── 不是为了什么目的，就是享受从 0 到 1 把东西做出来的过程。<br /><br />
                  <span className="text-[#C47A5B] font-medium">也正因为如此，我深知：好的品牌不是策划出来的，是创造出来的。</span>
                </p>
              </div>

              <div className="border-t about-divider my-8"></div>

              <div>
                <h3 className="font-serif text-lg font-semibold text-neutral-700 mb-3">[ 寻找战场 ]</h3>
                <p className="font-light text-sm leading-loose">
                  现在，我在寻找一个能让我把营销经验和创作能力真正结合的地方 ──<br /><br />
                  不只是执行别人的想法，而是用我的方式，帮品牌找到它真正的声音。
                </p>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* 复古小唱片彩蛋入口 */}
        <motion.div
          className="relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <SecretEggTheater />
        </motion.div>
      </div>
    </section>
  )
}