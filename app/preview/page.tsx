'use client'

import dynamic from 'next/dynamic'

const CreativeMode = dynamic(() => import('@/components/CreativeMode'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen flex items-center justify-center bg-[#FDFBF7]">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-[#E8A87C] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="font-handwriting text-lg text-[#8C6A5E]">正在加载...</p>
      </div>
    </div>
  ),
})

export default function PreviewPage() {
  return <CreativeMode onToggle={() => {}} />
}
