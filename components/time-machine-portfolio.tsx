"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Calendar, Code, Briefcase, Star } from "lucide-react"

interface TimelineNode {
  year: string
  phase: string
  description: string
  skills: string[]
  projects: Array<{
    name: string
    description: string
    tech: string[]
    impact?: string
  }>
  achievements: string[]
  mindset: string
  color: string
  icon: React.ReactNode
}

const timelineData: TimelineNode[] = [
  {
    year: "2022-2023",
    phase: "Foundation Builder",
    description: "Started Computer Science Engineering at KSR College - learning programming fundamentals",
    skills: ["C", "C++", "Java Basics", "HTML", "CSS", "JavaScript", "Database Fundamentals", "Problem Solving"],
    projects: [
      {
        name: "Programming Fundamentals",
        description: "Mastered C and C++ programming with data structures",
        tech: ["C", "C++", "Data Structures"],
        impact: "Built strong programming foundation"
      },
      {
        name: "Web Development Basics",
        description: "First web projects using HTML, CSS, and JavaScript",
        tech: ["HTML", "CSS", "JavaScript"],
        impact: "Understanding of web technologies"
      }
    ],
    achievements: ["Started CSE at KSR College", "Learned programming fundamentals", "Built first web applications"],
    mindset: "Everything was new and exciting. Every concept learned felt like unlocking a new superpower.",
    color: "from-green-400 to-blue-500",
    icon: <Code className="w-6 h-6" />
  },
  {
    year: "2023",
    phase: "Android Developer",
    description: "Focused on mobile development, building real-world applications that solve problems",
    skills: ["Android Development", "Java", "Firebase", "GPS Integration", "QR Code Processing", "Mobile UI/UX", "Google Maps API"],
    projects: [
      {
        name: "ClickProof",
        description: "Image verification system with timestamp, GPS location, and QR authenticity",
        tech: ["Java", "Android", "Firebase", "Google Maps", "QR Code"],
        impact: "Published on Play Store - solving image authenticity problems"
      },
      {
        name: "D-Quick",
        description: "Emergency drug identification for unconscious accident patients",
        tech: ["Java", "Android", "Firebase", "Real-time Processing"],
        impact: "Potentially life-saving medical emergency application"
      },
      {
        name: "MediQR",
        description: "QR code system for medicine identification despite label damage",
        tech: ["Java", "Android", "Firebase", "QR Processing"],
        impact: "Solved medicine accessibility problem in healthcare"
      }
    ],
    achievements: ["Published ClickProof on Play Store", "Built 3 production Android apps", "Mastered Firebase integration", "Learned mobile UI/UX design"],
    mindset: "Mobile development opened endless possibilities. Every app could impact real users and solve actual problems.",
    color: "from-purple-400 to-pink-500",
    icon: <Briefcase className="w-6 h-6" />
  },
  {
    year: "2024-2025",
    phase: "Full-Stack & Cloud Developer",
    description: "Expanded to web development with focus on full-stack applications and cloud technologies",
    skills: ["PHP", "MySQL", "MongoDB", "Redis", "jQuery", "AJAX", "Cloud Architecture", "SEO", "Full-Stack Development"],
    projects: [
      {
        name: "Getoofit - Blogging Platform",
        description: "Full-stack blogging platform with health calculators for client project",
        tech: ["HTML", "CSS", "JavaScript", "jQuery", "AJAX", "PHP", "MySQL", "Apache"],
        impact: "Complete web application with SEO optimization and Google AdSense integration"
      },
      {
        name: "User Management System",
        description: "Advanced authentication system with multi-database architecture",
        tech: ["jQuery", "AJAX", "PHP", "MySQL", "MongoDB", "Redis"],
        impact: "Secure user system with prepared statements and session management"
      }
    ],
    achievements: ["IEEE Region 10 Hackathon - 2nd Runner-Up", "AWS cloud services expertise", "Full-stack web development mastery", "Client project delivery"],
    mindset: "Full-stack development taught me how all pieces fit together. From database design to user interface, every layer matters.",
    color: "from-blue-400 to-cyan-500",
    icon: <Star className="w-6 h-6" />
  },
  {
    year: "2026",
    phase: "Graduating Engineer",
    description: "Completing CSE degree with strong CGPA and comprehensive development skills",
    skills: ["System Architecture", "Cloud Computing", "Advanced Flutter", "Enterprise Development", "Team Leadership", "Code Review", "Mentoring"],
    projects: [
      {
        name: "Advanced Mobile Solutions",
        description: "Enterprise-level mobile applications with cloud integration",
        tech: ["Flutter", "AWS Services", "Firebase", "REST APIs"],
        impact: "Scalable mobile solutions ready for production deployment"
      }
    ],
    achievements: ["Graduating with 8.63 CGPA", "Completed 5+ production applications", "Mastered multiple technology stacks", "Ready for professional software development"],
    mindset: "Now I see the complete picture. From mobile apps to cloud architecture, I'm ready to build scalable systems that make a real difference.",
    color: "from-orange-400 to-red-500",
    icon: <Star className="w-6 h-6" />
  }
]

export function TimeMachinePortfolio() {
  const [currentYear, setCurrentYear] = useState(3) // Start at 2026 (present)

  const currentData = timelineData[currentYear]

  const navigateYear = (direction: "prev" | "next") => {
    if (direction === "prev" && currentYear > 0) {
      setCurrentYear(currentYear - 1)
    } else if (direction === "next" && currentYear < timelineData.length - 1) {
      setCurrentYear(currentYear + 1)
    }
  }

  const jumpToYear = (index: number) => {
    setCurrentYear(index)
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Timeline Navigation */}
      <div className="flex items-center justify-center mb-8 md:mb-12">
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 bg-white rounded-2xl p-3 sm:p-4 shadow-lg border-2 border-black">
          {timelineData.map((node, index) => (
            <div key={index} className="flex items-center">
              <button
                onClick={() => jumpToYear(index)}
                className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-xl transition-all font-bold text-xs sm:text-sm md:text-base ${
                  currentYear === index
                    ? "bg-yellow-400 text-black border-2 border-black"
                    : "text-gray-600 hover:bg-gray-100 border-2 border-transparent"
                }`}
              >
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="font-bold">{node.year}</span>
              </button>
              {index < timelineData.length - 1 && (
                <div className="hidden sm:block w-4 md:w-8 h-px bg-gray-300 mx-1 md:mx-2" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Current Year Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentYear}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg p-4 sm:p-6 md:p-8 border-2 border-black shadow-md"
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 md:mb-8">
            <div className="flex items-start sm:items-center gap-3 sm:gap-6 w-full sm:w-auto">
              <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-yellow-400 flex items-center justify-center border-2 border-black flex-shrink-0`}>
                {currentData.icon}
              </div>
              <div className="flex-1">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-gray-900">
                  {currentData.year} - {currentData.phase}
                </h2>
                <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2 font-medium">
                  {currentData.description}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                onClick={() => navigateYear("prev")}
                disabled={currentYear === 0}
                className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-yellow-400 hover:text-black disabled:opacity-50 disabled:cursor-not-allowed transition-colors border-2 border-transparent hover:border-black"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={() => navigateYear("next")}
                className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-yellow-400 hover:text-black transition-colors border-2 border-transparent hover:border-black"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 gap-6 md:gap-8">
            {/* Skills & Mindset */}
            <div className="space-y-4 sm:space-y-6">
              <div>
                <h3 className="text-lg sm:text-xl font-black text-gray-900 mb-3 sm:mb-4">
                  Skills Developed
                </h3>
                <div className="flex flex-wrap gap-2">
                  {currentData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 sm:px-3 py-1 bg-white text-black rounded-full text-xs sm:text-sm font-bold border-2 border-black"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-black text-gray-900 mb-3 sm:mb-4">
                  Mindset
                </h3>
                <p className="text-sm sm:text-base text-gray-600 italic font-medium">
                  "{currentData.mindset}"
                </p>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-black text-gray-900 mb-3 sm:mb-4">
                  Key Achievements
                </h3>
                <ul className="space-y-2">
                  {currentData.achievements.map((achievement, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm sm:text-base text-gray-600 font-medium">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0 border border-black" />
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
