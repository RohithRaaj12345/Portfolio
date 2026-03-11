"use client"

import { motion } from "framer-motion"
import { Mail, Github, Linkedin, Phone, MapPin, Send } from "lucide-react"
import { SITE_CONFIG } from "@/lib/constants"

export function ContactSection() {
  return (
    <section id="contact" className="py-8 md:py-10 lg:py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-8 md:mb-10"
        >
          {/* Modern heading design matching the theme */}
          <div className="relative inline-block mb-4 md:mb-6">
            <div className="absolute inset-0 bg-yellow-400 rounded-2xl transform rotate-1"></div>
            <div className="relative bg-black text-yellow-400 px-6 py-3 md:px-8 md:py-4 rounded-2xl border-2 border-black">
              <div className="flex items-center gap-3">
                <Send className="w-5 h-5 md:w-6 md:h-6" />
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black">
                  Get in Touch
                </h2>
              </div>
            </div>
          </div>
          <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto font-medium px-4">
            Let's build something amazing together
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {/* Email */}
          <motion.a
            href={`mailto:${SITE_CONFIG.links.email}`}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
            whileHover={{ 
              scale: 1.03,
              y: -5,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
              transition: { duration: 0.2 }
            }}
            className="block bg-white rounded-xl p-5 md:p-6 border-2 border-black shadow-md group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-yellow-400 rounded-lg flex items-center justify-center border-2 border-black flex-shrink-0 group-hover:scale-110 transition-transform">
                <Mail className="w-6 h-6 md:w-7 md:h-7 text-black" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-black font-black text-base md:text-lg mb-1">Email</p>
                <p className="text-gray-600 text-sm md:text-base font-medium truncate">{SITE_CONFIG.links.email}</p>
              </div>
            </div>
          </motion.a>

          {/* LinkedIn */}
          <motion.a
            href={SITE_CONFIG.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
            whileHover={{ 
              scale: 1.03,
              y: -5,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
              transition: { duration: 0.2 }
            }}
            className="block bg-white rounded-xl p-5 md:p-6 border-2 border-black shadow-md group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-yellow-400 rounded-lg flex items-center justify-center border-2 border-black flex-shrink-0 group-hover:scale-110 transition-transform">
                <Linkedin className="w-6 h-6 md:w-7 md:h-7 text-black" />
              </div>
              <div className="flex-1">
                <p className="text-black font-black text-base md:text-lg mb-1">LinkedIn</p>
                <p className="text-gray-600 text-sm md:text-base font-medium">Connect with me professionally</p>
              </div>
            </div>
          </motion.a>

          {/* GitHub */}
          <motion.a
            href={SITE_CONFIG.links.github}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
            whileHover={{ 
              scale: 1.03,
              y: -5,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
              transition: { duration: 0.2 }
            }}
            className="block bg-white rounded-xl p-5 md:p-6 border-2 border-black shadow-md group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-black rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <Github className="w-6 h-6 md:w-7 md:h-7 text-yellow-400" />
              </div>
              <div className="flex-1">
                <p className="text-black font-black text-base md:text-lg mb-1">GitHub</p>
                <p className="text-gray-600 text-sm md:text-base font-medium">Check out my code</p>
              </div>
            </div>
          </motion.a>

          {/* Phone */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
            whileHover={{ 
              scale: 1.02,
              y: -3,
              transition: { duration: 0.2 }
            }}
            className="bg-white rounded-xl p-5 md:p-6 border-2 border-black shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-yellow-400 rounded-lg flex items-center justify-center border-2 border-black flex-shrink-0">
                <Phone className="w-6 h-6 md:w-7 md:h-7 text-black" />
              </div>
              <div className="flex-1">
                <p className="text-black font-black text-base md:text-lg mb-1">Phone</p>
                <p className="text-gray-600 text-sm md:text-base font-medium">{SITE_CONFIG.links.phone}</p>
              </div>
            </div>
          </motion.div>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
            whileHover={{ 
              scale: 1.02,
              y: -3,
              transition: { duration: 0.2 }
            }}
            className="bg-white rounded-xl p-5 md:p-6 border-2 border-black shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-yellow-400 rounded-lg flex items-center justify-center border-2 border-black flex-shrink-0">
                <MapPin className="w-6 h-6 md:w-7 md:h-7 text-black" />
              </div>
              <div className="flex-1">
                <p className="text-black font-black text-base md:text-lg mb-1">Location</p>
                <p className="text-gray-600 text-sm md:text-base font-medium">{SITE_CONFIG.links.location}</p>
              </div>
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
            whileHover={{ 
              scale: 1.05,
              rotate: 1,
              transition: { duration: 0.2 }
            }}
            className="bg-yellow-400 rounded-xl p-5 md:p-6 border-2 border-black shadow-md mt-6"
          >
            <p className="text-black text-center font-black text-base md:text-lg">
              ✨ Open to internships and full-time opportunities
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

