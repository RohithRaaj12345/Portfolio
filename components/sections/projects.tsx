"use client"

import { motion } from "framer-motion"
import { PROJECTS } from "@/lib/constants"
import { Code, ExternalLink, Github, Smartphone } from "lucide-react"

export function ProjectsSection() {
  return (
    <section id="projects" className="py-8 md:py-10 lg:py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-8 md:mb-10"
        >
          {/* Modern heading design */}
          <div className="relative inline-block mb-4 md:mb-6">
            <div className="absolute inset-0 bg-yellow-400 rounded-2xl transform rotate-1"></div>
            <div className="relative bg-black text-yellow-400 px-6 py-3 md:px-8 md:py-4 rounded-2xl border-2 border-black">
              <div className="flex items-center gap-3">
                <Code className="w-5 h-5 md:w-6 md:h-6" />
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black">
                  Projects
                </h2>
              </div>
            </div>
          </div>
          <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto font-medium px-4">
            Real-world applications solving actual problems
          </p>
        </motion.div>

        <div className="space-y-6">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                delay: index * 0.1,
                duration: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                transition: { duration: 0.2 }
              }}
              className="bg-white rounded-xl p-6 border-2 border-black shadow-md"
            >
              {/* Header */}
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-black text-black mb-2">
                    {project.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2 py-1 bg-yellow-400 text-black text-xs font-bold rounded border border-black">
                      {project.type}
                    </span>
                    <span className="text-xs text-gray-500 font-medium">
                      {project.period}
                    </span>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-black text-yellow-400 rounded-lg text-sm font-bold hover:bg-gray-800 transition-all border-2 border-black"
                  >
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                  {project.playstore && (
                    <a
                      href={project.playstore}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-yellow-400 text-black rounded-lg text-sm font-bold hover:bg-yellow-500 transition-all border-2 border-black"
                    >
                      <Smartphone className="w-4 h-4" />
                      Play Store
                    </a>
                  )}
                  {project.website && (
                    <a
                      href={project.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-yellow-400 text-black rounded-lg text-sm font-bold hover:bg-yellow-500 transition-all border-2 border-black"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Site
                    </a>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-sm md:text-base text-gray-700 mb-4 font-medium">
                {project.description}
              </p>

              {/* Impact */}
              <div className="mb-4 p-3 bg-yellow-400/10 rounded-lg border border-yellow-400/30">
                <p className="text-sm text-gray-700 font-medium">
                  <span className="font-black text-black">💡 </span>
                  {project.problem}
                </p>
              </div>

              {/* Architecture */}
              <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-xs md:text-sm text-gray-600 font-mono">
                  {project.architecture}
                </p>
              </div>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-3 py-1 bg-white text-black rounded-full text-xs font-bold border border-gray-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

