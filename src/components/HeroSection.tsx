import { useEffect, useRef } from "react"
import { ArrowDown, Sparkles, Code2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useI18n } from "@/lib/i18n"

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { t } = useI18n()

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      containerRef.current.style.setProperty("--mouse-x", `${x}%`)
      containerRef.current.style.setProperty("--mouse-y", `${y}%`)
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const scrollToProjects = () => {
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })
  }

  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0 gradient-hero" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: "url('/oliver-blog/images/hero-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-grid opacity-30" />

      {/* Mouse-following glow */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-20 pointer-events-none blur-[120px]"
        style={{
          background: "var(--gradient-primary)",
          left: "var(--mouse-x, 50%)",
          top: "var(--mouse-y, 50%)",
          transform: "translate(-50%, -50%)",
          transition: "left 0.3s ease-out, top 0.3s ease-out",
        }}
      />

      {/* Floating decorative orbs */}
      <div className="absolute top-1/4 left-[15%] w-2 h-2 rounded-full bg-primary/40 animate-float" />
      <div className="absolute top-1/3 right-[20%] w-3 h-3 rounded-full bg-accent/30 animate-float" style={{ animationDelay: "2s" }} />
      <div className="absolute bottom-1/3 left-[25%] w-1.5 h-1.5 rounded-full bg-primary/30 animate-float" style={{ animationDelay: "4s" }} />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        {/* Status badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-secondary/30 mb-8 animate-slide-up">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
          </span>
          <span className="text-sm text-muted-foreground">{t("hero.status")}</span>
        </div>

        {/* Main heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mb-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <span className="text-foreground">{t("hero.title1")}</span>
          <br />
          <span className="gradient-text">{t("hero.title2")}</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          {t("hero.subtitle")}
        </p>

        {/* Skill tags */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10 animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-secondary/50 border border-border/50">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs text-muted-foreground">{t("hero.tag1")}</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-secondary/50 border border-border/50">
            <Code2 className="h-3.5 w-3.5 text-accent" />
            <span className="text-xs text-muted-foreground">{t("hero.tag2")}</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-secondary/50 border border-border/50">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs text-muted-foreground">{t("hero.tag3")}</span>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: "0.4s" }}>
          <Button variant="premium" size="xl" onClick={scrollToProjects}>
            {t("hero.cta1")}
          </Button>
          <Button variant="glass" size="xl" onClick={scrollToContact}>
            {t("hero.cta2")}
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToProjects}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-fast animate-slide-up"
        style={{ animationDelay: "0.6s" }}
      >
        <span className="text-xs">{t("hero.scroll")}</span>
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </button>
    </section>
  )
}