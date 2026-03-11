"use client"

import { motion } from "framer-motion"
import { Briefcase, Calendar, MapPin, ExternalLink } from "lucide-react"
import { EXPERIENCE } from "@/lib/constants"

export function ExperienceSection() {
  const { internship } = EXPERIENCE

  return (
    <section id="experience" className="py-8 md:py-10 lg:py-12 bg-white">
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
                <Briefcase className="w-5 h-5 md:w-6 md:h-6" />
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black">
                  Work Experience
                </h2>
              </div>
            </div>
          </div>
          <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto font-medium px-4">
            Professional experience building real-world applications
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ 
            delay: 0.2,
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          whileHover={{ 
            scale: 1.01,
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            transition: { duration: 0.2 }
          }}
          className="bg-white rounded-2xl p-6 md:p-8 border-2 border-black shadow-lg"
        >
          {/* Company Header */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-black text-black mb-2">
                {internship.role}
              </h3>
              <div className="flex flex-wrap items-center gap-3 text-gray-700">
                <a
                  href={internship.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg md:text-xl font-bold hover:text-yellow-400 transition-colors flex items-center gap-2"
                >
                  {internship.company}
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
            
            <div className="flex flex-col gap-2 text-sm md:text-base">
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-4 h-4 flex-shrink-0" />
                <span className="font-medium">{internship.period}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span className="font-medium">{internship.location}</span>
              </div>
            </div>
          </div>

          {/* Responsibilities */}
          <div className="space-y-3">
            <h4 className="text-lg md:text-xl font-black text-black mb-4">
              Key Responsibilities & Achievements
            </h4>
            <ul className="space-y-3">
              {internship.responsibilities.map((responsibility, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3 text-gray-700"
                >
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0 border border-black"></div>
                  <span className="font-medium text-sm md:text-base">{responsibility}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Tech Stack */}
          <div className="mt-6 pt-6 border-t-2 border-gray-200">
            <h4 className="text-base md:text-lg font-black text-black mb-3">
              Technologies Used
            </h4>
            <div className="flex flex-wrap gap-2">
              {["Flutter", "Dart", "AWS S3", "DynamoDB", "Lambda", "API Gateway", "Cognito", "Mobile Development"].map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 bg-yellow-400 text-black rounded-lg text-xs md:text-sm font-bold border-2 border-black"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

