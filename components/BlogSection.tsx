import { ArrowUpRight, Calendar, Heart } from 'lucide-react'

const posts = [
  {
    id: 1,
    title: 'The Art of Minimalist Design',
    excerpt: 'Exploring how less can truly be more in modern design practices...',
    date: 'May 10, 2024',
    image: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=minimalist%20design%20workspace%20clean%20desk%20white%20aesthetic%20creative%20studio&image_size=landscape_16_9',
    likes: 128,
  },
  {
    id: 2,
    title: 'Color Psychology in Branding',
    excerpt: 'Understanding how colors influence perception and emotion in design...',
    date: 'April 28, 2024',
    image: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=colorful%20brand%20palette%20swatches%20creative%20design%20studio%20warm%20tones&image_size=landscape_16_9',
    likes: 96,
  },
  {
    id: 3,
    title: 'Handmade Digital Illustrations',
    excerpt: 'Bringing organic, handcrafted elements into digital art...',
    date: 'April 15, 2024',
    image: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=hand%20drawn%20digital%20illustration%20artistic%20creative%20workspace%20warm%20colors&image_size=landscape_16_9',
    likes: 156,
  },
]

export default function BlogSection() {
  return (
    <section id="blog" className="py-24 px-4 bg-transparent">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-wheat-gold font-medium tracking-wider uppercase text-sm">Blog</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-amber-brown mt-4">
            Latest <span className="text-gradient">Articles</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <article
              key={post.id}
              className="overflow-hidden transition-all duration-300 group rounded-organic"
              style={{ background: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.2)' }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-white/80 backdrop-blur-sm">
                  <Heart className="w-4 h-4 text-peach-pink" />
                  <span className="text-xs text-amber-brown">{post.likes}</span>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 text-sm text-amber-brown/50 mb-3">
                  <Calendar className="w-4 h-4" />
                  <span>{post.date}</span>
                </div>
                <h3 className="font-serif font-bold text-lg text-amber-brown mb-2 group-hover:text-wheat-gold transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-amber-brown/60 mb-4">{post.excerpt}</p>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-wheat-gold font-medium text-sm hover:text-amber-brown transition-colors"
                >
                  Read More
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="glass-button text-amber-brown">
            View All Articles
          </button>
        </div>
      </div>
    </section>
  )
}
