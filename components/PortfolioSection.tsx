'use client'

import { useState } from 'react'
import { ArrowUpRight, X } from 'lucide-react'

const categories = ['All', 'UI/UX', 'Branding', 'Web Design', 'Illustration']

const projects = [
  {
    id: 1,
    title: 'E-commerce Redesign',
    category: 'UI/UX',
    image: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=modern%20ecommerce%20website%20design%20clean%20minimal%20warm%20colors%20product%20showcase&image_size=landscape_16_9',
    description: 'A complete redesign of a fashion e-commerce platform',
  },
  {
    id: 2,
    title: 'Brand Identity',
    category: 'Branding',
    image: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=creative%20brand%20identity%20design%20logo%20packaging%20stationery%20warm%20earth%20tones&image_size=landscape_16_9',
    description: 'Visual identity for a boutique coffee brand',
  },
  {
    id: 3,
    title: 'Portfolio Website',
    category: 'Web Design',
    image: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=elegant%20portfolio%20website%20design%20artistic%20layout%20soft%20colors%20creative&image_size=landscape_16_9',
    description: 'Personal portfolio for a fine artist',
  },
  {
    id: 4,
    title: 'Mobile App UI',
    category: 'UI/UX',
    image: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=mobile%20app%20interface%20design%20modern%20clean%20warm%20pastel%20colors%20user%20friendly&image_size=landscape_16_9',
    description: 'Fitness tracking app with intuitive UI',
  },
  {
    id: 5,
    title: 'Illustrated Characters',
    category: 'Illustration',
    image: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=cute%20hand%20drawn%20illustration%20characters%20whimsical%20soft%20colors%20digital%20art&image_size=landscape_16_9',
    description: 'Character design for children\'s book',
  },
  {
    id: 6,
    title: 'Restaurant Website',
    category: 'Web Design',
    image: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=restaurant%20website%20design%20food%20photography%20warm%20ambient%20elegant%20layout&image_size=landscape_16_9',
    description: 'Website for a farm-to-table restaurant',
  },
]

export default function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(project => project.category === activeCategory)

  return (
    <section id="portfolio" className="py-24 px-4 bg-transparent">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-wheat-gold font-medium tracking-wider uppercase text-sm">Portfolio</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-amber-brown mt-4">
            My <span className="text-gradient">Creative Work</span>
          </h2>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-wheat-gold text-amber-brown'
                  : 'bg-white/50 text-amber-brown/70 hover:bg-white/80'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="overflow-hidden cursor-pointer group transition-all duration-300 rounded-organic"
              style={{ background: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.2)' }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-amber-brown/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                  <span className="text-white text-sm">{project.category}</span>
                  <h3 className="text-white font-serif font-bold text-lg mt-1">{project.title}</h3>
                </div>
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                  <ArrowUpRight className="w-5 h-5 text-amber-brown" />
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-serif font-bold text-amber-brown">{project.title}</h3>
                <p className="text-sm text-amber-brown/60 mt-1">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedProject(null)} />
          <div className="relative max-w-2xl w-full overflow-hidden rounded-organic" style={{ background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.3)' }}>
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center hover:bg-white transition-colors"
            >
              <X className="w-5 h-5 text-amber-brown" />
            </button>
            <img
              src={selectedProject.image}
              alt={selectedProject.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <span className="text-wheat-gold text-sm">{selectedProject.category}</span>
              <h3 className="text-2xl font-serif font-bold text-amber-brown mt-2">{selectedProject.title}</h3>
              <p className="text-amber-brown/70 mt-3">{selectedProject.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
