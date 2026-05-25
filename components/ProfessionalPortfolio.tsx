'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'

// 案例数据
const caseStudies = [
  {
    id: 1,
    title: '账号运营',
    subtitle: '从 0 到 1 构筑品类爆款模型',
    stat: '0→8000+',
    tags: ['消费者视角', '热点捕捉', '从0到1模型迭代'],
    situation: '某眼镜品牌小红书官方账号冷启动，面临同质化严重、用户选购决策疲劳的痛点。',
    task: '打破"发产品自嗨"的僵局，在 2 个月内跑出品类爆款模型，实现精准涨粉。',
    actions: [
      { title: '痛点反推内容', desc: '转换视角放弃硬广，聚焦解决消费者"挑花眼、不会选"的真实选购痛点。' },
      { title: '热点借势破圈', desc: '敏锐捕捉平台趋势，将首篇爆文绑定"春日桃花"热点，成功撬动自然流量。' },
      { title: '内容动态迭代', desc: '定时高频检索同品类高赞内容，在 2 个月内进行多轮模型测试与迭代。' }
    ],
    result: '成功打造多篇现象级爆文，实现从 0 到 8,000+ 垂直高粘性粉丝的跨越式增长。',
    screenshot: '/images/shafa.jpg',
    image: '/images/账号运营.png'
  },
  {
    id: 2,
    title: '品牌重塑',
    subtitle: '潜力品牌的内容重构与直播突围',
    stat: 'GMV +40%',
    tags: ['内容重塑', '场景可视化', '直播爆文联动'],
    situation: '品牌心智老化，王牌产品缺乏新鲜度，难以撬动李佳琦等顶级主播的直播坑位。',
    task: '重塑品牌内容树，为成熟期产品注入新卖点，激活消费者购买欲并提升转化。',
    actions: [
      { title: '理念重塑', desc: '更新"科技成就秀发之美"全新 Slogan，引入核心实验室数据与即时对比，沉淀信任资产。' },
      { title: '产品功能可视化', desc: '首创"干发喷雾 + 细齿梳"组合。利用细齿梳完美解决"粉末残留头皮"的物理痛点，并将"带走油脂"的隐形原理具象化。' },
      { title: '直播前后联动', desc: '直播前预埋素人真实许愿自然流爆文，直播中李佳琦call back群众呼声，现场演示用极其直观的视觉冲击力实现高转化。' }
    ],
    result: '成功拿下 TOP 主播核心坑位，达成直播 GMV 同比强劲增长 40%。',
    screenshot: '/images/shafa.jpg',
    image: '/images/品牌重塑.png'
  },
  {
    id: 3,
    title: '打造爆款话题',
    subtitle: '撬动全民跟风的现象级大促营销',
    stat: '#UGC TOP1',
    tags: ['UGC 裂变', '分层机制', '平台助推'],
    situation: '大促节点流量争夺白热化，常规品牌话题难以引发用户自发共鸣与主动裂变。',
    task: '打造当时小红书商业合作参与范围最广的现象级 Campaign。',
    actions: [
      { title: '顺水推舟造概念', desc: '提炼老用户口碑中高频出现的"无限回购"关键词，顺水推舟绑定原生高流速标签 #无限回购精华。' },
      { title: '分层激活裂变机制', desc: '首创"免费送 200 瓶正装"重磅福利，并针对"已购老客"与"未购潜客"精细化定制不同的参与门槛，极大激发了 UGC 的自发产出。' },
      { title: '商业合力放大', desc: '高效联动平台官方"火焰话题"与精准广告投放，实现声量滚雪球式扩散。' }
    ],
    result: '该 Campaign 成为当时小红书商业合作参与范围最广的行业案例。',
    screenshot: '/images/shafa.jpg',
    image: '/images/打造爆款话题.jpeg'
  },
  {
    id: 4,
    title: '有趣化沟通',
    subtitle: '小昵称撬动新增长',
    stat: 'ROI 至高到 4',
    tags: ['情绪价值', '低成本营销', '创意文案'],
    situation: '两款潜力产品（无名眼镜 / 缕灵繁毛躁沙发顺柔霜）面临沟通成本高、消费者难直观感知卖点的困境。',
    task: '通过"昵称营销"降低沟通门槛，用直觉式词汇直击消费者心智，缩短决策路径。',
    actions: [
      { title: '情绪价值赋能（眼镜）', desc: '突破单纯的功能介绍，赋予其"桃花镜"专属昵称，将产品升华为满足"招桃花"心理投射的情绪载体。' },
      { title: '跨界概念通感（顺柔霜）', desc: '将护肤领域的经典认知"熨斗"跨界降维引入护发品类，提炼出"沙发小熨斗"。精准利用消费者对"熨斗 = 抚平"的既有认知积累，直观传达"沙发变直、抚平毛躁"的终极痛点。' }
    ],
    result: '以极低的沟通成本，让消费者秒懂卖点，大幅缩短购买决策路径，ROI 至高到 4。',
    screenshot: '/images/shafa.jpg'
  }
]

// 和纸胶带组件
const WashiTape = ({ position = 'top-center' }: { position?: 'top-center' | 'top-right' }) => {
  const positions = {
    'top-center': 'left-1/2 -translate-x-1/2 -top-2',
    'top-right': '-right-2 -top-2'
  }
  
  return (
    <div className={`absolute z-20 ${positions[position]}`} style={{ opacity: 0.6 }}>
      <svg width="120" height="30" viewBox="0 0 120 30" fill="none">
        <defs>
          <pattern id="washiTexture" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
            <rect width="2" height="2" fill="rgba(255,255,255,0.15)" />
          </pattern>
          <linearGradient id="washiGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(245, 230, 210, 0.7)" />
            <stop offset="50%" stopColor="rgba(250, 240, 225, 0.8)" />
            <stop offset="100%" stopColor="rgba(245, 230, 210, 0.7)" />
          </linearGradient>
        </defs>
        <path 
          d="M0 15C0 15 5 5 15 5H105C115 5 120 15 120 15C120 15 115 25 105 25H15C5 25 0 15 0 15Z" 
          fill="url(#washiGradient)"
        />
        <rect width="120" height="30" fill="url(#washiTexture)" />
        <path d="M10 10C10 10 8 15 10 20C12 25 15 25 15 25" stroke="rgba(0,0,0,0.08)" strokeWidth="0.5" />
        <path d="M20 8C20 8 18 14 20 20C22 26 25 26 25 26" stroke="rgba(0,0,0,0.08)" strokeWidth="0.5" />
        <path d="M30 12C30 12 28 16 30 20C32 24 35 24 35 24" stroke="rgba(0,0,0,0.06)" strokeWidth="0.5" />
        <path d="M90 10C90 10 88 15 90 20C92 25 95 25 95 25" stroke="rgba(0,0,0,0.08)" strokeWidth="0.5" />
        <path d="M100 8C100 8 98 14 100 20C102 26 105 26 105 26" stroke="rgba(0,0,0,0.08)" strokeWidth="0.5" />
      </svg>
    </div>
  )
}

// 迷你黑胶唱片组件
const MiniVinylRecord = () => {
  // 环绕星星数据 - 固定配置，避免运行时随机（增加到12颗星星）
  const orbitStars = [
    { type: 'star', angle: 0, opacity: 0.9, size: 1.0 },
    { type: 'cross', angle: 30, opacity: 0.65, size: 0.75 },
    { type: 'star', angle: 60, opacity: 0.7, size: 0.9 },
    { type: 'cross', angle: 90, opacity: 0.8, size: 0.85 },
    { type: 'star', angle: 120, opacity: 0.8, size: 1.05 },
    { type: 'cross', angle: 150, opacity: 0.55, size: 0.7 },
    { type: 'star', angle: 180, opacity: 0.6, size: 0.95 },
    { type: 'cross', angle: 210, opacity: 0.75, size: 0.8 },
    { type: 'star', angle: 240, opacity: 0.75, size: 1.0 },
    { type: 'cross', angle: 270, opacity: 0.6, size: 0.85 },
    { type: 'star', angle: 300, opacity: 0.65, size: 0.9 },
    { type: 'cross', angle: 330, opacity: 0.7, size: 0.75 },
  ]
  
  return (
    // 使用负margin让星星可以超出容器边界
    <div className="relative w-[100px] h-[100px] -m-[20px]">
      {/* 圆形环绕星星轨道 - 使用CSS变量确保动画不冲突 */}
      <motion.div
        className="absolute inset-0"
        style={{ 
          width: '140px', 
          height: '140px',
          left: '-20px',
          top: '-20px',
          zIndex: 1
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      >
        {orbitStars.map((star, index) => {
          // 计算星星在轨道上的位置
          const radius = 58
          const angleRad = (star.angle * Math.PI) / 180
          const x = Math.cos(angleRad) * radius + 70 // 70是140px容器的一半
          const y = Math.sin(angleRad) * radius + 70
          
          return (
            <motion.div
              key={index}
              className="absolute"
              style={{
                left: `${x}px`,
                top: `${y}px`,
                transform: 'translate(-50%, -50%)',
                zIndex: 1,
              }}
              animate={{ 
                opacity: [star.opacity * 0.3, star.opacity, star.opacity * 0.3],
                scale: [star.size * 0.7, star.size, star.size * 0.7]
              }}
              transition={{ 
                duration: 2.5,
                repeat: Infinity,
                delay: index * 0.25
              }}
            >
              {star.type === 'star' ? (
                <svg 
                  viewBox="0 0 24 24" 
                  fill="currentColor" 
                  className="text-amber-400"
                  style={{ 
                    width: `${star.size * 20}px`, 
                    height: `${star.size * 20}px`, 
                    opacity: star.opacity,
                    filter: 'drop-shadow(0 0 4px rgba(251, 191, 36, 0.6))'
                  }}
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              ) : (
                <svg 
                  viewBox="0 0 24 24" 
                  fill="currentColor" 
                  className="text-amber-300"
                  style={{ 
                    width: `${star.size * 20}px`, 
                    height: `${star.size * 20}px`, 
                    opacity: star.opacity,
                    filter: 'drop-shadow(0 0 4px rgba(251, 191, 36, 0.6))'
                  }}
                >
                  <path d="M12 6v12M6 12h12"/>
                </svg>
              )}
            </motion.div>
          )
        })}
      </motion.div>
      
      {/* 黑胶唱片 - 置于星星轨道上方 */}
      <div className="relative w-[100px] h-[100px] ml-[20px] mt-[20px]" style={{ zIndex: 2 }}>
        <motion.div
          className="w-full h-full rounded-full relative"
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          style={{
            background: `
              repeating-radial-gradient(circle at center, 
                #2a2a2a 0px, 
                #323232 0.4px, 
                #2a2a2a 0.8px,
                #2d2d2d 1.2px
              ),
              linear-gradient(145deg, #3a3a3a 0%, #2a2a2a 50%, #303030 100%)
            `,
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 8px 20px rgba(0,0,0,0.2), inset 0 1px 2px rgba(255,255,255,0.05)'
          }}
        >
          <div className="absolute inset-0 rounded-full" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 60%)' }} />
          
          <svg className="absolute inset-0 w-full h-full opacity-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <circle key={i} cx="50" cy="50" r={46 - i * 3.5} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.2" />
            ))}
          </svg>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[20px] h-[20px] rounded-full bg-gradient-to-br from-[#FAF8F3] to-[#EADFC9]" />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// 黄铜夹子组件 - 纯代码SVG + Drop Shadow
const BrassClip = ({ position = 'top-center', size = 'normal', offsetX = 0 }: { 
  position?: 'top-center' | 'top-left'; 
  size?: 'normal' | 'large';
  offsetX?: number
}) => {
  const positions = {
    'top-center': `left-1/2 -translate-x-1/2`,
    'top-left': `left-4`
  }
  
  const dimensions = {
    'normal': { width: 45, height: 35 },
    'large': { width: 60, height: 46 }
  }
  
  const { width, height } = dimensions[size]
  
  return (
    <motion.div 
      className={`absolute z-30 -top-4 ${positions[position]} pointer-events-none`}
      style={{ 
        transform: `translateX(${offsetX}px)`,
        filter: 'drop-shadow(0 6px 10px rgba(40, 25, 10, 0.2))'
      }}
      initial={{ scale: 0.8, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 80, damping: 15 }}
    >
      <svg width={width} height={height} viewBox="0 0 45 35" fill="none">
        {/* 夹子主体 */}
        <path 
          d="M5 10 C5 5, 40 5, 40 10 L38 32 C38 34, 7 34, 7 32 Z" 
          fill="#D4AF37" 
          opacity="0.95"
        />
        {/* 夹子顶部横梁 */}
        <rect x="10" y="4" width="25" height="7" rx="2" fill="#B38F23" />
        {/* 横梁装饰点 */}
        <circle cx="22.5" cy="7.5" r="1.8" fill="#8C6D13"/>
        {/* 高光效果 */}
        <path 
          d="M6 11 C6 6, 39 6, 39 11" 
          stroke="rgba(255,255,255,0.5)" 
          strokeWidth="1" 
          strokeLinecap="round" 
          fill="none" 
        />
        <ellipse cx="22.5" cy="7.5" rx="0.8" ry="0.5" fill="rgba(255,255,255,0.5)" />
      </svg>
    </motion.div>
  )
}

// 拍立得照片组件 - 绝对定位 + 无overflow限制
const PolaroidPhoto = () => {
  return (
    <motion.div 
      className="absolute z-30 -top-6 -right-8"
      style={{
        transform: 'rotate(6deg)',
        filter: 'drop-shadow(2px 6px 15px rgba(0,0,0,0.08))'
      }}
      initial={{ rotate: 0, y: -10, opacity: 0 }}
      whileInView={{ rotate: 6, y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 60, damping: 15 }}
      whileHover={{ rotate: 12 }}
    >
      <div className="w-[90px] p-1.5 bg-[#FAF8F5] border border-neutral-200/40">
        <div className="w-full aspect-square bg-neutral-200 overflow-hidden">
          <img 
            src="/images/shafa.jpg" 
            alt="polaroid photo"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="h-4 w-full bg-[#FAF8F5]" />
      </div>
    </motion.div>
  )
}

// 3D翻转卡片组件 - 生态容器隔离法
const FlipCard = ({ study, index }: { study: typeof caseStudies[0]; index: number }) => {
  const [isFlipped, setIsFlipped] = useState(false)
  
  // 每张卡片不同的旋转角度
  const rotations = [-1.5, 0, 2]
  // 夹子的微小偏移
  const clipOffsets = [4, -3, 6]

  const handleClick = () => {
    setIsFlipped(!isFlipped)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: -2 }}
      whileInView={{ opacity: 1, y: 0, rotate: rotations[index] }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        type: "spring", 
        stiffness: 80, 
        damping: 18,
        delay: index * 0.18
      }}
      className="relative overflow-visible group cursor-pointer"
      onClick={handleClick}
      style={{ perspective: '1000px', minHeight: '850px' }}
    >
      {/* 第一层：黄铜夹子 - 最高层级 */}
      <BrassClip position="top-center" size="normal" offsetX={clipOffsets[index]} />
      
      {/* 第二层：3D翻转卡片容器 - 最内层 */}
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 100, 
          damping: 20,
          duration: 0.6
        }}
        style={{ 
          transformStyle: 'preserve-3d',
          minHeight: '850px'
        }}
        className="relative"
      >
        {/* 正面 - STAR内容 */}
        <motion.div 
          className="absolute inset-0 p-6 md:p-8 case-study-card"
          style={{
            clipPath: `polygon(
              0 2px, 3px 0, 9px 2px, 15px 0, 21px 3px, 28px 1px, 34px 4px, 40px 0, 47px 3px, 53px 1px, 60px 4px, 66px 0, 72px 2px, 79px 1px, 85px 3px, 91px 0, 97px 2px, 100% 3px, 
              100% calc(100% - 3px), 97% calc(100% - 1px), 91% calc(100% - 4px), 85% calc(100% - 2px), 79% calc(100% - 1px), 72% calc(100% - 3px), 66% calc(100% - 1px), 60% calc(100% - 4px), 53% calc(100% - 2px), 47% calc(100% - 1px), 40% calc(100% - 3px), 34% calc(100% - 1px), 28% calc(100% - 4px), 21% calc(100% - 2px), 15% calc(100% - 1px), 9% calc(100% - 3px), 3% calc(100% - 2px), 0 calc(100% - 3px)
            )`,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden'
          }}
        >
          {/* 案例编号 */}
          <span className="text-[80px] font-extralight text-[var(--color-ink)]/[0.04] leading-none absolute -top-2 -right-2 pointer-events-none" style={{ fontFamily: 'Noto Sans SC, sans-serif' }}>
            {study.id.toString().padStart(2, '0')}
          </span>
          
          {/* 苔藓绿结果块 */}
          <motion.div 
            className="relative mb-6 result-card"
            style={{
              borderRadius: '10px',
              padding: '20px 24px'
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-4xl font-semibold text-[var(--color-bg-cream-light)]" style={{ fontFamily: 'Georgia, serif', letterSpacing: '0.02em' }}>
                {study.stat}
              </span>
              <span className="text-xs text-white/50 tracking-[0.3em] uppercase">Result</span>
            </div>
            <p className="text-sm text-white/75 leading-relaxed" style={{ fontFamily: 'Noto Sans SC, sans-serif', letterSpacing: '0.02em' }}>
              {study.result}
            </p>
            <span className="absolute bottom-2 right-2 text-xs text-white/40 tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">点击看我怎么做？</span>
          </motion.div>
          
          {/* 标题 */}
          <h3 className="text-xl md:text-2xl font-medium text-[var(--color-ink)] mb-1" style={{ fontFamily: 'Noto Serif SC, serif', letterSpacing: '0.1em' }}>
          {study.title}
        </h3>
        <p className="text-xs text-[var(--color-text)] mb-4" style={{ fontFamily: 'Noto Sans SC, sans-serif', letterSpacing: '0.06em' }}>
          {study.subtitle}
        </p>
          
          {/* 标签 */}
          <div className="flex flex-wrap gap-2 mb-6">
            {study.tags.map((tag, i) => (
              <span 
                key={i}
                className="case-tag px-2 py-1 text-xs rounded-full"
                style={{ fontFamily: 'Noto Sans SC, sans-serif' }}
              >
                {tag}
              </span>
            ))}
          </div>
          
          {/* STAR 模型内容 - Situation 和 Task */}
          <div className="space-y-4">
            <div>
              <span className="text-xs font-medium text-[var(--color-accent)] tracking-[0.15em] uppercase block mb-1" style={{ fontFamily: 'Noto Sans SC, sans-serif' }}>
                Situation
              </span>
              <p className="text-sm text-[var(--color-text)] leading-relaxed" style={{ fontFamily: 'Noto Sans SC, sans-serif' }}>
                {study.situation}
              </p>
            </div>
            
            <div>
              <span className="text-xs font-medium text-[var(--color-accent)] tracking-[0.15em] uppercase block mb-1" style={{ fontFamily: 'Noto Sans SC, sans-serif' }}>
                Task
              </span>
              <p className="text-sm text-[var(--color-text)] leading-relaxed" style={{ fontFamily: 'Noto Sans SC, sans-serif' }}>
                {study.task}
              </p>
            </div>
          </div>
          
          {/* 案例图片 - 打造爆款话题保持小尺寸，其他两个卡片保持大尺寸 */}
          <div className="relative mt-6" style={{ 
            width: index === 2 ? '54%' : '90%', 
            marginLeft: index === 2 ? '23%' : '5%', 
            marginRight: index === 2 ? '23%' : '5%' 
          }}>
            {/* 胶带贴纸 */}
            <div 
              className="absolute -top-2 -left-2 z-10"
              style={{
                width: index === 2 ? '36px' : '60px',
                height: index === 2 ? '12px' : '20px',
                background: 'linear-gradient(135deg, var(--color-paper-deep) 0%, var(--color-accent-soft) 50%, var(--color-paper-deep) 100%)',
                borderRadius: '2px',
                opacity: '0.85',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                transform: 'rotate(-5deg)',
                backgroundImage: `
                  repeating-linear-gradient(
                    -45deg,
                    transparent,
                    transparent 4px,
                    rgba(255,255,255,0.2) 4px,
                    rgba(255,255,255,0.2) 8px
                  )
                `
              }}
            />
            {/* 图片容器 */}
            <div 
              className="relative overflow-hidden"
              style={{
                borderRadius: '4px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                transform: 'rotate(0.5deg)'
              }}
            >
              <img 
                src={study.image} 
                alt={study.title}
                className="w-full h-auto"
                style={{ display: 'block' }}
              />
            </div>
          </div>
          
          {/* 纸张质感纹理 */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='cardNoise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23cardNoise)'/%3E%3C/svg%3E")`
            }}
          />
        </motion.div>

        {/* 背面 - Actions内容 */}
        <motion.div 
          className="absolute inset-0 p-6 md:p-8 case-study-card"
          style={{
            clipPath: `polygon(
              0 2px, 3px 0, 9px 2px, 15px 0, 21px 3px, 28px 1px, 34px 4px, 40px 0, 47px 3px, 53px 1px, 60px 4px, 66px 0, 72px 2px, 79px 1px, 85px 3px, 91px 0, 97px 2px, 100% 3px, 
              100% calc(100% - 3px), 97% calc(100% - 1px), 91% calc(100% - 4px), 85% calc(100% - 2px), 79% calc(100% - 1px), 72% calc(100% - 3px), 66% calc(100% - 1px), 60% calc(100% - 4px), 53% calc(100% - 2px), 47% calc(100% - 1px), 40% calc(100% - 3px), 34% calc(100% - 1px), 28% calc(100% - 4px), 21% calc(100% - 2px), 15% calc(100% - 1px), 9% calc(100% - 3px), 3% calc(100% - 2px), 0 calc(100% - 3px)
            )`,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            transformStyle: 'preserve-3d'
          }}
        >
          {/* 标题 */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg md:text-xl font-medium text-[var(--color-ink)]" style={{ fontFamily: 'Noto Serif SC, serif', letterSpacing: '0.08em' }}>
                {study.title}
              </h3>
              <p className="text-xs text-[var(--color-muted)] mt-1" style={{ fontFamily: 'Noto Sans SC, sans-serif', letterSpacing: '0.04em' }}>
                执行方案
              </p>
            </div>
            <span className="text-xs text-[var(--color-muted)]" style={{ fontFamily: 'Noto Sans SC, sans-serif' }}>
              点击翻转返回
            </span>
          </div>
          
          {/* Actions 内容 */}
          <div className="space-y-6">
            <div>
              <span className="text-xs font-medium text-[var(--color-accent)] tracking-[0.15em] uppercase block mb-3" style={{ fontFamily: 'Noto Sans SC, sans-serif' }}>
                Actions
              </span>
              {study.actions.map((action, i) => (
                <div key={i} className="mb-4 last:mb-0 p-4 bg-white/40 rounded-sm" style={{ clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))' }}>
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center text-xs font-medium text-[var(--color-accent)]" style={{ fontFamily: 'Noto Sans SC, sans-serif' }}>
                      {i + 1}
                    </span>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[var(--color-ink)] mb-1" style={{ fontFamily: 'Noto Sans SC, sans-serif' }}>
                        {action.title}
                      </p>
                      <p className="text-xs text-[var(--color-text)] leading-relaxed" style={{ fontFamily: 'Noto Sans SC, sans-serif' }}>
                        {action.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* 纸张质感纹理 */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='backNoise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23backNoise)'/%3E%3C/svg%3E")`
            }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

// 星星特效组件 - 从左往右不断冒小星星，带流星拖尾效果
const StarTrail = () => {
  const stars = [
    { type: 'star', delay: 0, opacity: 0.8 },
    { type: 'cross', delay: 0.3, opacity: 0.6 },
    { type: 'star', delay: 0.6, opacity: 0.7 },
    { type: 'cross', delay: 0.9, opacity: 0.5 },
    { type: 'star', delay: 1.2, opacity: 0.65 },
    { type: 'cross', delay: 1.5, opacity: 0.55 },
    { type: 'star', delay: 1.8, opacity: 0.7 },
    { type: 'shooting', delay: 2.1, opacity: 0.9 },
  ]
  
  return (
    <div className="relative flex items-center" style={{ width: '140px', height: '1.1em' }}>
      {stars.map((star, index) => (
        <motion.div
          key={index}
          className="absolute"
          initial={{ opacity: 0, x: -25, scale: 0 }}
          animate={{ 
            opacity: [0, star.opacity, 0], 
            x: ['-25px', '120px'],
            scale: [0, 1.1, 0.8]
          }}
          transition={{ 
            duration: star.type === 'shooting' ? 1 : 1.5,
            delay: star.delay + (index * 0.15),
            repeat: Infinity,
            repeatDelay: 0.2
          }}
        >
          {star.type === 'shooting' ? (
            // 流星带拖尾
            <div className="relative">
              {/* 拖尾 */}
              <motion.div
                className="absolute -left-8 top-1/2 -translate-y-1/2 w-8 h-0.5"
                style={{
                  background: 'linear-gradient(to left, rgba(251, 191, 36, 0.6), transparent)',
                  borderRadius: '2px',
                  filter: 'blur(1px)'
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: [0, 1, 0.5] }}
                transition={{ duration: 1 }}
              />
              {/* 流星头部 */}
              <svg 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="text-amber-400"
                style={{ width: '1.1em', height: '1.1em', opacity: star.opacity }}
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
          ) : star.type === 'star' ? (
            <svg 
              viewBox="0 0 24 24" 
              fill="currentColor" 
              className="text-amber-500"
              style={{ width: '1.1em', height: '1.1em', opacity: star.opacity }}
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          ) : (
            <svg 
              viewBox="0 0 24 24" 
              fill="currentColor" 
              className="text-amber-600"
              style={{ width: '1.1em', height: '1.1em', opacity: star.opacity }}
            >
              <path d="M12 6v12M6 12h12"/>
            </svg>
          )}
        </motion.div>
      ))}
    </div>
  )
}

// 顶部通栏装置组件
const TopBanner = ({ study }: { study: typeof caseStudies[0] }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: 'blur(12px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ ease: 'easeOut', duration: 1, delay: 0.2 }}
      className="relative mb-16 group"
      style={{ overflow: 'visible', zIndex: 5 }}
    >
      {/* 悬停显示图片 - 右上角 */}
      <motion.div 
        className="absolute z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          right: '3%',
          top: '3%',
          width: '25%',
          maxWidth: '140px',
          filter: 'drop-shadow(2px 6px 15px rgba(0,0,0,0.08))'
        }}
      >
        <img 
          src="/images/shafa.jpg" 
          alt="hover image"
          className="w-full h-auto rounded-sm"
        />
      </motion.div>
      
      {/* 迷你黑胶唱片 - 放在clipPath容器外面，避免星星被裁剪 */}
      <div 
        className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-20"
        style={{ marginTop: '-10px' }}
      >
        <MiniVinylRecord />
      </div>
      
      {/* 主内容容器 - 左侧留出150px空间给唱片，确保5%间隔 */}
      <div 
        className="relative p-6 md:p-8 lg:p-10"
        style={{
          paddingLeft: '150px',
          minHeight: '200px',
          background: 'linear-gradient(145deg, var(--color-paper-light) 0%, var(--color-paper) 100%)',
          clipPath: `polygon(
            0 3px, 4px 0, 12px 2px, 20px 0, 28px 3px, 35px 1px, 43px 4px, 50px 0, 58px 3px, 65px 1px, 72px 4px, 80px 0, 88px 2px, 95px 1px, 100% 3px, 
            100% calc(100% - 3px), 95% calc(100% - 1px), 88% calc(100% - 4px), 80% calc(100% - 2px), 72% calc(100% - 1px), 65% calc(100% - 3px), 58% calc(100% - 1px), 50% calc(100% - 4px), 43% calc(100% - 2px), 35% calc(100% - 1px), 28% calc(100% - 3px), 20% calc(100% - 1px), 12% calc(100% - 4px), 4% calc(100% - 2px), 0 calc(100% - 3px)
          )`,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03), inset 0 1px 0 rgba(255, 255, 255, 0.5)'
        }}
      >
        {/* 黄铜夹子（大尺寸）- 最高层级 */}
        <motion.div 
          className="absolute z-30 left-1/2 -translate-x-1/2 -top-5 pointer-events-none"
          style={{ 
            filter: 'drop-shadow(0 6px 12px rgba(40, 25, 10, 0.2))'
          }}
        >
          <svg width="60" height="46" viewBox="0 0 60 46" fill="none">
            <path 
              d="M7 13 C7 6, 53 6, 53 13 L51 42 C51 44, 9 44, 9 42 Z" 
              fill="#D4AF37" 
              opacity="0.95"
            />
            <rect x="13" y="5" width="34" height="9" rx="2" fill="#B38F23" />
            <circle cx="30" cy="9.5" r="2.4" fill="#8C6D13"/>
            <path 
              d="M8 14 C8 7, 52 7, 52 14" 
              stroke="rgba(255,255,255,0.5)" 
              strokeWidth="1.2" 
              strokeLinecap="round" 
              fill="none" 
            />
            <ellipse cx="30" cy="9.5" rx="1" ry="0.6" fill="rgba(255,255,255,0.5)" />
          </svg>
        </motion.div>
        
        {/* 内容区域 */}
        <div className="flex flex-col items-start gap-6">
          {/* 右侧文字内容 */}
          <div className="flex-1">
            {/* 苔藓绿结果块 */}
            <div 
              className="inline-block mb-4 px-4 py-2 result-card"
              style={{
                borderRadius: '8px'
              }}
            >
              <span className="text-2xl font-semibold text-[var(--color-bg-cream-light)]" style={{ fontFamily: 'Georgia, serif' }}>
                {study.stat}
              </span>
              <span className="ml-3 text-xs text-white/50 tracking-[0.2em] uppercase">Result</span>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-medium text-[var(--color-ink)] mb-2" style={{ fontFamily: 'Noto Serif SC, serif', letterSpacing: '0.1em' }}>
              {study.title}
            </h2>
            <p className="text-sm text-[var(--color-muted)] mb-4" style={{ fontFamily: 'Noto Sans SC, sans-serif' }}>
              {study.subtitle}
            </p>
            
            {/* 标签 */}
            <div className="flex flex-wrap gap-2">
              {study.tags.map((tag, i) => (
                <span 
                  key={i}
                  className="case-tag px-3 py-1 text-xs rounded-full"
                  style={{ fontFamily: 'Noto Sans SC, sans-serif' }}
                >
                  {tag}
                </span>
              ))}
            </div>
            
            {/* 核心内容 */}
            <div className="mt-6 space-y-4">
              <div className="flex gap-3">
                <span className="text-xs font-medium text-[var(--color-accent)] tracking-[0.2em] uppercase flex-shrink-0" style={{ fontFamily: 'Noto Sans SC, sans-serif' }}>
                  Situation
                </span>
                <p className="text-sm text-[var(--color-text)] leading-relaxed" style={{ fontFamily: 'Noto Sans SC, sans-serif' }}>
                  {study.situation}
                </p>
              </div>
              <div className="flex gap-3">
                <span className="text-xs font-medium text-[var(--color-accent)] tracking-[0.2em] uppercase flex-shrink-0" style={{ fontFamily: 'Noto Sans SC, sans-serif' }}>
                  Task
                </span>
                <p className="text-sm text-[var(--color-text)] leading-relaxed" style={{ fontFamily: 'Noto Sans SC, sans-serif' }}>
                  {study.task}
                </p>
              </div>
              {study.actions.map((action, i) => (
                <div key={i} className="flex gap-3">
                  <span className="text-xs font-medium text-[var(--color-accent)] tracking-[0.2em] uppercase flex-shrink-0" style={{ fontFamily: 'Noto Sans SC, sans-serif' }}>
                    Action {i + 1}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-[var(--color-ink)]" style={{ fontFamily: 'Noto Sans SC, sans-serif' }}>
                      {action.title}
                    </p>
                    <p className="text-xs text-[var(--color-text)] mt-1 leading-relaxed" style={{ fontFamily: 'Noto Sans SC, sans-serif' }}>
                      {action.desc}
                    </p>
                  </div>
                </div>
              ))}
              <div className="flex gap-3">
                <span className="text-xs font-medium text-[var(--color-accent)] tracking-[0.2em] uppercase flex-shrink-0" style={{ fontFamily: 'Noto Sans SC, sans-serif' }}>
                  Result
                </span>
                <p className="text-sm text-[var(--color-deep-green)] font-medium leading-relaxed" style={{ fontFamily: 'Noto Sans SC, sans-serif' }}>
                  {study.result}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* 纸张质感纹理 */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paperNoise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23paperNoise)'/%3E%3C/svg%3E")`
          }}
        />
      </div>
    </motion.div>
  )
}

// 主组件
interface ProfessionalPortfolioProps {
  isInModal?: boolean
}

export default function ProfessionalPortfolio({ isInModal = false }: ProfessionalPortfolioProps) {
  // 获取"有趣化沟通"案例（第一个展示）
  const featuredStudy = caseStudies.find(s => s.title === '有趣化沟通') || caseStudies[3]
  
  // 获取其他三个商业案例
  const otherStudies = caseStudies.filter(s => s.title !== '有趣化沟通')
  
  return (
    <section id="marketing" className={`relative ${isInModal ? 'py-8 md:py-12' : 'py-16 md:py-24 min-h-screen'} marketing-page`}>
      
      <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-[1600px]">
        {/* 营销实战案例大标题 */}
        <motion.div 
          className="relative z-20 mb-8 md:mb-12"
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ ease: 'easeOut', duration: 0.7 }}
        >
          <div className="flex items-center gap-2 md:gap-3">
            <h1 
              className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[var(--color-ink)] tracking-[0.2em]"
              style={{ fontFamily: 'Noto Serif SC, Georgia, serif' }}
            >
              营销实战案例
            </h1>
            {/* 星星特效 */}
            <StarTrail />
          </div>
          <div className="mt-4 w-24 h-[2px] bg-gradient-to-r from-[var(--color-accent)] to-transparent" />
        </motion.div>
        
        {/* 顶部通栏 - 有趣化沟通 */}
        <TopBanner study={featuredStudy} />
        
        {/* 三列案例卡片 - 扑克牌发牌动效 */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-8 md:mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.15 }}
        >
          {otherStudies.map((study, index) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 20, filter: 'blur(8px)', rotate: index % 2 === 0 ? 1.5 : -1.5 }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)', rotate: 0 }}
              viewport={{ once: true }}
              transition={{ ease: 'easeOut', duration: 0.8 }}
              style={{ transitionDelay: `${index * 0.15 + 0.25}s` }}
            >
              <FlipCard study={study} index={index} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}