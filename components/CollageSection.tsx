'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// 专业模式卡片数据
const professionalCards = [
  {
    id: 'p1',
    type: 'text',
    title: '8年深耕',
    subtitle: '品牌营销',
    color: '#E6C384',
    size: 'large',
    position: { x: 0, y: 0 },
  },
  {
    id: 'p2',
    type: 'image',
    title: '品牌履历',
    subtitle: '雅诗兰黛 / 娇韵诗 / 联合利华',
    imageUrl: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=modern%20brand%20marketing%20presentation%20minimal%20style%20clean%20background&image_size=landscape_4_3',
    size: 'medium',
    position: { x: 1, y: 0 },
  },
  {
    id: 'p3',
    type: 'text',
    title: '小红书运营',
    subtitle: '0到8000粉',
    color: '#FBC6B1',
    size: 'small',
    position: { x: 2, y: 0 },
  },
  {
    id: 'p4',
    type: 'image',
    title: '品牌搭建',
    subtitle: '从0到1',
    imageUrl: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=data%20chart%20growth%20analytics%20business%20minimal%20design&image_size=square',
    size: 'small',
    position: { x: 0, y: 1 },
  },
  {
    id: 'p5',
    type: 'text',
    title: 'GMV 400万+',
    subtitle: '品牌重塑直播',
    color: '#8C6A5E',
    size: 'large',
    position: { x: 1, y: 1 },
  },
  {
    id: 'p6',
    type: 'image',
    title: '高效投放',
    subtitle: '高性价比',
    imageUrl: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=professional%20office%20workspace%20modern%20clean%20minimal&image_size=portrait_4_3',
    size: 'medium',
    position: { x: 2, y: 1 },
  },
]

// 创意模式卡片数据
const creativeCards = [
  {
    id: 'c1',
    type: 'image',
    title: '云与青草地',
    subtitle: '自然灵感',
    imageUrl: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=soft%20clouds%20over%20green%20meadow%20dreamy%20watercolor%20style&image_size=landscape_16_9',
    size: 'large',
    position: { x: 0, y: 0 },
    rotate: -2,
  },
  {
    id: 'c2',
    type: 'text',
    title: '手作饰品',
    subtitle: '设计师',
    color: '#E8A87C',
    size: 'small',
    position: { x: 1, y: 0 },
    rotate: 3,
  },
  {
    id: 'c3',
    type: 'image',
    title: '手账10年生',
    subtitle: '记录生活',
    imageUrl: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=beautiful%20handmade%20journal%20scrapbook%20with%20watercolor%20flowers&image_size=square',
    size: 'medium',
    position: { x: 2, y: 0 },
    rotate: -1,
  },
  {
    id: 'c4',
    type: 'text',
    title: '生活旅行家',
    subtitle: '探索世界',
    color: '#FBC6B1',
    size: 'medium',
    position: { x: 0, y: 1 },
    rotate: 1,
  },
  {
    id: 'c5',
    type: 'image',
    title: '发现小美好',
    subtitle: '日常治愈',
    imageUrl: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=cute%20kawaii%20dog%20character%20illustration%20soft%20pastel%20colors&image_size=square',
    size: 'small',
    position: { x: 1, y: 1 },
    rotate: -3,
  },
  {
    id: 'c6',
    type: 'image',
    title: '麦田意象',
    subtitle: '金色灵感',
    imageUrl: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=golden%20wheat%20field%20sunset%20warm%20dreamy%20atmosphere&image_size=portrait_4_3',
    size: 'medium',
    position: { x: 2, y: 1 },
    rotate: 2,
  },
  {
    id: 'c7',
    type: 'text',
    title: '画些治愈',
    subtitle: '手绘时光',
    color: '#A1C4FD',
    size: 'small',
    position: { x: 0, y: 2 },
    rotate: -1,
  },
  {
    id: 'c8',
    type: 'image',
    title: '串珠细节',
    subtitle: '手工匠心',
    imageUrl: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=handmade%20beaded%20jewelry%20closeup%20artisan%20craft&image_size=square',
    size: 'small',
    position: { x: 1, y: 2 },
    rotate: 4,
  },
]

interface CardProps {
  card: typeof professionalCards[0] | typeof creativeCards[0]
  isCreativeMode: boolean
}

function Card({ card, isCreativeMode }: CardProps) {
  const [isHovered, setIsHovered] = useState(false)
  
  const sizeClasses: Record<string, string> = {
    small: 'col-span-1 row-span-1',
    medium: 'col-span-1 row-span-2',
    large: 'col-span-2 row-span-2',
  }

  return (
    <motion.div
      className={`relative ${sizeClasses[card.size]} overflow-hidden rounded-xl cursor-pointer group`}
      initial={{ opacity: 0, scale: 0.8, rotate: (card as any).rotate || 0 }}    
      animate={{ 
        opacity: 1, 
        scale: 1, 
        rotate: (card as any).rotate || 0,
        y: isHovered ? -8 : 0,
      }}
      exit={{ opacity: 0, scale: 0.8, rotate: -15 }}
      transition={{ 
        type: 'spring', 
        stiffness: 300, 
        damping: 20,
        delay: Math.random() * 0.3,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
    >
      {card.type === 'image' ? (
        <div className="relative h-full w-full">
          <motion.img
            src={card.imageUrl}
            alt={card.title}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.4 }}
          />
          {/* 遮罩层 */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0.3 }}
            transition={{ duration: 0.3 }}
          />
          {/* 文字叠加 */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className={`text-lg font-semibold mb-1 ${
              isCreativeMode ? 'font-handwriting text-white' : 'font-sans text-white'
            }`}>
              {card.title}
            </h3>
            <p className="text-sm text-white/80 font-sans">{card.subtitle}</p>
          </div>
        </div>
      ) : (
        <div 
          className="h-full w-full flex flex-col items-center justify-center p-4"
          style={{ backgroundColor: card.color }}
        >
          <motion.h3 
            className={`text-xl mb-1 ${
              isCreativeMode ? 'font-handwriting text-white' : 'font-sans text-white'
            }`}
            animate={{ scale: isHovered ? 1.1 : 1 }}
          >
            {card.title}
          </motion.h3>
          <p className="text-sm text-white/90 font-sans">{card.subtitle}</p>
        </div>
      )}
      {/* 悬浮时的浮起效果阴影 */}
      <motion.div
        className="absolute inset-0 -z-10 rounded-xl bg-black/20 blur-md"
        animate={{ 
          opacity: isHovered ? 1 : 0,
          y: 8,
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}

interface CollageSectionProps {
  isCreativeMode: boolean
}

export default function CollageSection({ isCreativeMode }: CollageSectionProps) {
  const cards = isCreativeMode ? creativeCards : professionalCards
  
  return (
    <section className="relative py-12 px-6 bg-transparent transition-all duration-500">
      <div className="max-w-5xl mx-auto">
        {/* 标题 */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className={`text-3xl md:text-4xl font-semibold mb-3 ${
            isCreativeMode ? 'font-handwriting text-[#8C6A5E]' : 'font-sans text-[#333333]'
          }`}>
            {isCreativeMode ? '创作世界' : '专业领域'}
          </h2>
          <p className="text-[#8C6A5E]/70 font-sans">
            {isCreativeMode ? '用双手创造温暖，用镜头记录美好' : '数据驱动增长，创意赋能品牌'}
          </p>
        </motion.div>

        {/* 拼贴图网格 */}
        <motion.div
          className={`grid gap-3 md:gap-4 ${
            isCreativeMode 
              ? 'grid-cols-3 grid-rows-3' 
              : 'grid-cols-3 grid-rows-2'
          }`}
          style={{
            perspective: '1000px',
          }}
        >
          <AnimatePresence mode="popLayout">
            {cards.map((card) => (
              <Card key={card.id} card={card} isCreativeMode={isCreativeMode} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
