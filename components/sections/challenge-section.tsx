"use client"

import { motion } from "framer-motion"
import { TimeMachinePortfolio } from "@/components/time-machine-portfolio"
import { Clock } from "lucide-react"

export function ChallengeSection() {
  return (
    <section id="challenge" className="pt-0 pb-8 md:pb-10 lg:pb-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                <Clock className="w-5 h-5 md:w-6 md:h-6" />
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black">
                  My Developer Journey
                </h2>
              </div>
            </div>
          </div>
          <p className="text-base md:text-lg text-gray-700 max-w-3xl mx-auto font-medium px-4">
            From foundation to full-stack — explore how I evolved through different phases of learning and building
          </p>
        </motion.div>

        {/* Time Machine Component */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ 
            delay: 0.2,
            duration: 0.7,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        >
          <TimeMachinePortfolio />
        </motion.div>
      </div>
    </section>
  )
}

