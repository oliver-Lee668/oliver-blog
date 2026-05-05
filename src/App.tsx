import { I18nProvider } from "@/lib/i18n"
import { translations } from "@/i18n"
import { Navbar } from "@/components/Navbar"
import { HeroSection } from "@/components/HeroSection"
import { ProjectsSection } from "@/components/ProjectsSection"
import { AboutSection } from "@/components/AboutSection"
import { ContactSection } from "@/components/ContactSection"
import { Footer } from "@/components/Footer"
import { AIChatbot } from "@/components/AIChatbot"

function App() {
  return (
    <I18nProvider translations={translations}>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main>
          <HeroSection />
          <ProjectsSection />
          <AboutSection />
          <ContactSection />
        </main>
        <Footer />
        <AIChatbot />
      </div>
    </I18nProvider>
  )
}

export default App