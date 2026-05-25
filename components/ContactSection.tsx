'use client'

import { Send, Mail, MapPin, Phone } from 'lucide-react'
import { useState } from 'react'

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormData({ name: '', email: '', message: '' })
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  return (
    <section id="contact" className="py-24 px-4 bg-transparent">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-wheat-gold font-medium tracking-wider uppercase text-sm">Contact</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-amber-brown mt-4">
            Get <span className="text-gradient">In Touch</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <p className="text-lg text-amber-brown/70">
              Have a project in mind? I'd love to hear from you! Whether it's a design inquiry, collaboration opportunity,
              or just a friendly hello, feel free to reach out.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-wheat-gold/20 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-wheat-gold" />
                </div>
                <div>
                  <div className="font-medium text-amber-brown">Email</div>
                  <div className="text-amber-brown/60">hello@vickyzhao.design</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-peach-pink/20 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-peach-pink" />
                </div>
                <div>
                  <div className="font-medium text-amber-brown">Phone</div>
                  <div className="text-amber-brown/60">+86 123 4567 8900</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-sky-blue/20 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-sky-blue" />
                </div>
                <div>
                  <div className="font-medium text-amber-brown">Location</div>
                  <div className="text-amber-brown/60">Shanghai, China</div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-8 rounded-organic" style={{ background: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto rounded-full bg-wheat-gold/20 flex items-center justify-center mb-4">
                  <Send className="w-8 h-8 text-wheat-gold" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-amber-brown mb-2">Message Sent!</h3>
                <p className="text-amber-brown/60">Thank you for reaching out. I'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-amber-brown mb-2">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-soft bg-white/50 border border-white/50 focus:border-wheat-gold focus:outline-none transition-colors"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-amber-brown mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-soft bg-white/50 border border-white/50 focus:border-wheat-gold focus:outline-none transition-colors"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-amber-brown mb-2">Message</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={5}
                    className="w-full px-4 py-3 rounded-soft bg-white/50 border border-white/50 focus:border-wheat-gold focus:outline-none transition-colors resize-none"
                    placeholder="Tell me about your project..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-soft font-medium bg-wheat-gold text-amber-brown hover:bg-wheat-gold/80 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
