import { Instagram, Twitter, Linkedin, Heart } from 'lucide-react'

const socialLinks = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
]

export default function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-amber-brown/10 bg-transparent">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-serif font-bold text-gradient">Vicky</h3>
            <p className="text-sm text-amber-brown/50 mt-1">Creative Designer</p>
          </div>

          <div className="flex items-center gap-4">
            {socialLinks.map((social, index) => {
              const Icon = social.icon
              return (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-white/50 flex items-center justify-center text-amber-brown/60 hover:text-wheat-gold hover:bg-white/80 transition-all duration-300"
                >
                  <Icon className="w-5 h-5" />
                </a>
              )
            })}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-amber-brown/10 text-center">
          <p className="text-sm text-amber-brown/50 flex items-center justify-center gap-2">
            Made with <Heart className="w-4 h-4 text-peach-pink fill-peach-pink" /> by Vicky Zhao
          </p>
          <p className="text-xs text-amber-brown/30 mt-2">© 2024 All rights reserved</p>
        </div>
      </div>
    </footer>
  )
}
