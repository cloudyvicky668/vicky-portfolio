'use client'

import { motion } from 'framer-motion'
import ProfessionalPortfolio from './ProfessionalPortfolio'

export default function PortfolioModal() {
  return (
    <div className="h-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ProfessionalPortfolio isInModal={true} />
      </motion.div>
    </div>
  )
}
