import { InteractiveHeroSection } from "@/components/interactive-hero"
import { ChallengeSection } from "@/components/sections/challenge-section"
import { ProjectsSection } from "@/components/sections/projects"
import { ExperienceSection } from "@/components/sections/experience"
import { AchievementsSection } from "@/components/sections/achievements"
import { ContactSection } from "@/components/sections/contact"

export default function Home() {
  return (
    <main className="relative bg-white transition-colors duration-300">
      <InteractiveHeroSection />
      <ChallengeSection />
      <ProjectsSection />
      <ExperienceSection />
      <AchievementsSection />
      <ContactSection />
    </main>
  )
}

