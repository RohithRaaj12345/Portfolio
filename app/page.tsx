import { InteractiveHeroSection } from "@/components/interactive-hero"
import { ChallengeSection } from "@/components/sections/challenge-section"
import { ProjectsSection } from "@/components/sections/projects"
import { ExperienceSection } from "@/components/sections/experience"
import { AchievementsSection } from "@/components/sections/achievements"
import { ContactSection } from "@/components/sections/contact"
import { SITE_CONFIG } from "@/lib/constants"

export default function Home() {
  return (
    <main className="relative bg-white dark:bg-slate-900 transition-colors duration-300">
      <InteractiveHeroSection />
      <ChallengeSection />
      <ProjectsSection />
      <ExperienceSection />
      <AchievementsSection />
      <ContactSection />

      {/* Clean Footer */}
      <footer className="py-6 md:py-8 px-4 sm:px-6 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-4 md:mb-6 animate-fade-in">
            <h3 className="text-xl md:text-2xl font-black text-yellow-400 mb-2 md:mb-3">
              Rohith S
            </h3>
            <p className="text-gray-400 mb-3 md:mb-4 font-medium text-sm md:text-base">
              Designed and built with attention to detail ✨
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
              <a 
                href={SITE_CONFIG.links.github}
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-4 py-2 md:px-5 md:py-2 bg-yellow-400 hover:bg-yellow-500 text-black rounded-lg font-bold transition-all border-2 border-yellow-400 text-sm md:text-base hover:scale-105 hover:-translate-y-1"
              >
                GitHub
              </a>
              <a 
                href={SITE_CONFIG.links.linkedin}
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-4 py-2 md:px-5 md:py-2 bg-yellow-400 hover:bg-yellow-500 text-black rounded-lg font-bold transition-all border-2 border-yellow-400 text-sm md:text-base hover:scale-105 hover:-translate-y-1"
              >
                LinkedIn
              </a>
              <a 
                href={`mailto:${SITE_CONFIG.links.email}`}
                className="px-4 py-2 md:px-5 md:py-2 bg-yellow-400 hover:bg-yellow-500 text-black rounded-lg font-bold transition-all border-2 border-yellow-400 text-sm md:text-base hover:scale-105 hover:-translate-y-1"
              >
                Email
              </a>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-3 md:pt-4">
            <p className="text-center text-gray-500 text-xs md:text-sm font-medium">
              © 2026 Rohith S. All rights reserved. Built with Next.js, React, and Tailwind CSS.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
