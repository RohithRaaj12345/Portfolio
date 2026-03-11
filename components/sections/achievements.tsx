"use client"

import { motion } from "framer-motion"
import { ACHIEVEMENTS } from "@/lib/constants"
import { Trophy, Clock, Zap, Award } from "lucide-react"

export function AchievementsSection() {
  return (
    <section id="achievements" className="py-8 md:py-10 lg:py-12 bg-gray-50">
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
                <Award className="w-5 h-5 md:w-6 md:h-6" />
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black">
                  Achievements
                </h2>
              </div>
            </div>
          </div>
          <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto font-medium px-4">
            Recognition and milestones that mark my journey
          </p>
        </motion.div>

        {ACHIEVEMENTS.map((achievement, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ 
              delay: idx * 0.2,
              duration: 0.6,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            whileHover={{ 
              scale: 1.02,
              y: -5,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              transition: { duration: 0.2 }
            }}
            className="bg-white rounded-lg p-6 md:p-8 max-w-4xl mx-auto mb-6 md:mb-8 border-2 border-black shadow-md"
          >
            <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6">
              <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 bg-yellow-400 rounded-lg flex items-center justify-center border-2 border-black">
                <Trophy className="w-6 h-6 md:w-8 md:h-8 text-black" />
              </div>
              
              <div className="flex-1 w-full">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3 md:mb-4 gap-3 md:gap-4">
                  <h3 className="text-xl md:text-2xl font-black text-black">{achievement.title}</h3>
                  <span className="px-3 py-1.5 md:px-4 md:py-2 bg-yellow-400 text-black border-2 border-black rounded-md text-xs md:text-sm font-bold whitespace-nowrap self-start">
                    {achievement.year}
                  </span>
                </div>
                
                <p className="text-sm md:text-base text-gray-700 mb-4 md:mb-6 leading-relaxed font-medium">{achievement.description}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  <div className="flex items-center gap-3 p-3 md:p-4 bg-gray-50 rounded-lg border-2 border-black">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-black rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-4 h-4 md:w-5 md:h-5 text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-gray-600 font-bold text-xs md:text-sm">Duration</p>
                      <p className="text-black font-black text-sm md:text-base">36 Hours Non-Stop</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 md:p-4 bg-gray-50 rounded-lg border-2 border-black">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-black rounded-lg flex items-center justify-center flex-shrink-0">
                      <Zap className="w-4 h-4 md:w-5 md:h-5 text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-gray-600 font-bold text-xs md:text-sm">Skills Demonstrated</p>
                      <p className="text-black font-black text-sm md:text-base">Rapid Development</p>
                    </div>
                  </div>
                </div>

                <div className="mt-3 md:mt-4 p-2.5 md:p-3 bg-yellow-400 rounded-lg border-2 border-black">
                  <p className="text-black font-bold text-center text-xs md:text-sm">
                    🏆 Organized by <span className="font-black">{achievement.organization}</span>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

