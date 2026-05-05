import { useState } from "react"
import { Play, X, ExternalLink, Bot, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useI18n } from "@/lib/i18n"

const projectMeta = [
  {
    id: "ai-customer-service",
    image: "/images/project-ai-customer-service.png",
    icon: <Bot className="h-5 w-5" />,
    tags: ["LLM", "RAG", "React", "Node.js", "Python", "Vector DB"],
    videoSrc: "/videos/ai-customer-service-demo.mp4",
  },
  {
    id: "ai-sales-assistant",
    image: "/images/project-ai-sales-assistant.png",
    icon: <ShoppingCart className="h-5 w-5" />,
    tags: ["GPT-4", "Python", "React", "PostgreSQL", "LangChain"],
    videoSrc: "/videos/ai-sales-assistant-demo.mp4",
  },
]

export function ProjectsSection() {
  const [videoModal, setVideoModal] = useState<string | null>(null)
  const { t } = useI18n()

  // Get localized project items
  const projectItems = [0, 1].map((i) => ({
    title: t(`projects.items.${i}.title`),
    subtitle: t(`projects.items.${i}.subtitle`),
    description: t(`projects.items.${i}.description`),
    highlights: [0, 1, 2, 3].map((j) => t(`projects.items.${i}.highlights.${j}`)),
  }))

  return (
    <section id="projects" className="relative py-24 md:py-32">
      {/* Section background */}
      <div className="absolute inset-0 gradient-surface" />
      <div className="absolute inset-0 bg-grid opacity-20" />

      <div className="relative z-10 container mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 text-xs font-medium text-primary rounded-full border border-primary/20 bg-primary/5 mb-4">
            {t("projects.badge")}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("projects.title")}<span className="gradient-text">{t("projects.titleHighlight")}</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            {t("projects.subtitle")}
          </p>
        </div>

        {/* Project cards */}
        <div className="grid gap-8 md:gap-12">
          {projectMeta.map((meta, index) => {
            const item = projectItems[index]
            return (
              <div
                key={meta.id}
                className="group grid md:grid-cols-2 gap-8 items-center"
              >
                {/* Image side */}
                <div className={index % 2 === 1 ? "md:order-2" : ""}>
                  <div className="relative rounded-xl overflow-hidden border border-border/50 transition-smooth group-hover:shadow-card-hover group-hover:border-primary/20">
                    <img
                      src={meta.image}
                      alt={item.title}
                      className="w-full aspect-[5/4] object-cover transition-slow group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                    {/* Video overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-background/40 opacity-0 group-hover:opacity-100 transition-smooth">
                      <Button
                        variant="premium"
                        size="lg"
                        className="gap-2 rounded-full"
                        onClick={() => setVideoModal(meta.id)}
                      >
                        <Play className="h-4 w-4" />
                        {t("projects.watchVideo")}
                      </Button>
                    </div>
                    {/* Glow effect */}
                    <div className="absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-slow pointer-events-none"
                      style={{ background: "var(--gradient-border)", padding: "1px" }}
                    />
                  </div>
                </div>

                {/* Content side */}
                <div className={`flex flex-col gap-6 ${index % 2 === 1 ? "md:order-1" : ""}`}>
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20 mb-4">
                      <span className="text-primary">{meta.icon}</span>
                      <span className="text-xs font-medium text-primary">{item.subtitle}</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Highlights */}
                  <ul className="space-y-2.5">
                    {item.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                        <span className="text-sm text-muted-foreground">{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-2">
                    {meta.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 text-xs rounded-md bg-secondary/80 text-secondary-foreground border border-border/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    <Button
                      variant="premium"
                      className="gap-2"
                      onClick={() => setVideoModal(meta.id)}
                    >
                      <Play className="h-4 w-4" />
                      {t("projects.demoVideo")}
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <ExternalLink className="h-4 w-4" />
                      {t("projects.learnMore")}
                    </Button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Video Modal */}
      {videoModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-fade-in"
          onClick={() => setVideoModal(null)}
        >
          <div
            className="relative w-full max-w-4xl rounded-xl border border-border/50 bg-card overflow-hidden shadow-lg animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-border/50">
              <h3 className="font-semibold text-foreground">
                {projectItems[projectMeta.findIndex((p) => p.id === videoModal)]?.title} - {t("projects.videoTitle")}
              </h3>
              <Button variant="ghost" size="icon" onClick={() => setVideoModal(null)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="aspect-video bg-background">
              <video
                src={projectMeta.find((p) => p.id === videoModal)?.videoSrc}
                poster={projectMeta.find((p) => p.id === videoModal)?.image}
                controls
                autoPlay
                className="w-full h-full"
              >
                Your browser does not support video playback.
              </video>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}