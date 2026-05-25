import { Heart, Award, Coffee, Target } from 'lucide-react'

const stats = [
  { icon: Award, value: '8+', label: 'Years Experience' },
  { icon: Target, value: '150+', label: 'Projects Completed' },
  { icon: Heart, value: '98%', label: 'Client Satisfaction' },
  { icon: Coffee, value: '∞', label: 'Cups of Coffee' },
]

export default function AboutSection() {
  return (
    <section id="about" className="py-24 px-4 bg-transparent">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-wheat-gold font-medium tracking-wider uppercase text-sm">About Me</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-amber-brown mt-4">
            The Story Behind <span className="text-gradient">the Design</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-full h-full bg-wheat-gold/20 rounded-organic" />
            <div className="relative rounded-organic overflow-hidden shadow-glass">
              <img
                src="https://neeko-copilot.bytedance.net/api/text2image?prompt=creative%20female%20designer%20portrait%20soft%20natural%20lighting%20warm%20tones%20artistic%20professional&image_size=portrait_4_3"
                alt="Vicky Zhao"
                className="w-full h-80 object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <p className="text-lg text-amber-brown/70 leading-relaxed">
              I'm a passionate creative designer with a love for crafting beautiful and meaningful digital experiences.
              My journey began with a simple curiosity about how things look and feel, which quickly turned into a lifelong pursuit.
            </p>
            <p className="text-lg text-amber-brown/70 leading-relaxed">
              I believe that great design is not just about aesthetics—it's about solving problems, connecting people,
              and creating moments that matter. Every project I take on is infused with care, attention to detail,
              and a touch of handcrafted warmth.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 rounded-full bg-wheat-gold/10 text-amber-brown text-sm">UI/UX Design</span>
              <span className="px-4 py-2 rounded-full bg-peach-pink/10 text-amber-brown text-sm">Brand Identity</span>
              <span className="px-4 py-2 rounded-full bg-sky-blue/10 text-amber-brown text-sm">Web Design</span>
              <span className="px-4 py-2 rounded-full bg-amber-brown/10 text-amber-brown text-sm">Illustration</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div
                key={index}
                className="p-6 text-center transition-all duration-300 rounded-organic"
                style={{ background: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.2)' }}
              >
                <Icon className="w-8 h-8 mx-auto mb-3 text-wheat-gold" />
                <div className="text-3xl font-serif font-bold text-amber-brown">{stat.value}</div>
                <div className="text-sm text-amber-brown/60 mt-1">{stat.label}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
