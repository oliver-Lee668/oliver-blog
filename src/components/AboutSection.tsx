import {
  Brain,
  Code2,
  Database,
  Layers,
  Rocket,
  Users,
  Terminal,
  Figma,
} from "lucide-react"
import { useI18n } from "@/lib/i18n"

const skillItems = [
  {
    icon: <Brain className="h-5 w-5" />,
    categoryKey: "ai",
    items: ["LLM / GPT / Claude", "RAG", "Prompt Engineering", "LangChain / LlamaIndex", "Vector DB"],
  },
  {
    icon: <Layers className="h-5 w-5" />,
    categoryKey: "frontend",
    items: ["React / Next.js", "TypeScript", "TailwindCSS", "Vue.js", "Mini Programs"],
  },
  {
    icon: <Terminal className="h-5 w-5" />,
    categoryKey: "backend",
    items: ["Node.js / Python", "Go / Java", "RESTful API", "Microservices", "Docker / K8s"],
  },
  {
    icon: <Database className="h-5 w-5" />,
    categoryKey: "data",
    items: ["PostgreSQL / MySQL", "Redis / MongoDB", "Elasticsearch", "Pinecone / Milvus"],
  },
]

const stats = [
  { labelKey: "about.stats.experience", value: "6+", zhSuffix: "年", enSuffix: "" },
  { labelKey: "about.stats.projects", value: "20+", zhSuffix: "个", enSuffix: "" },
  { labelKey: "about.stats.aiProjects", value: "5+", zhSuffix: "个", enSuffix: "" },
  { labelKey: "about.stats.satisfaction", value: "100", zhSuffix: "%", enSuffix: "%" },
]

export function AboutSection() {
  const { t, locale } = useI18n()

  const experiences = [0, 1].map((i) => ({
    period: t(`about.experiences.${i}.period`),
    role: t(`about.experiences.${i}.role`),
    company: t(`about.experiences.${i}.company`),
    description: t(`about.experiences.${i}.description`),
  }))

  const cooperation = [0, 1, 2].map((i) => ({
    title: t(`about.cooperation.${i}.title`),
    description: t(`about.cooperation.${i}.description`),
  }))

  return (
    <section id="about" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-background" />

      {/* Subtle gradient orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[100px] pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 text-xs font-medium text-primary rounded-full border border-primary/20 bg-primary/5 mb-4">
            {t("about.badge")}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("about.title")}<span className="gradient-text">{t("about.titleHighlight")}</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            {t("about.subtitle")}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((stat) => (
            <div
              key={stat.labelKey}
              className="text-center p-6 rounded-xl border border-border/50 bg-card/50 transition-smooth hover:border-primary/20 hover:shadow-glow"
            >
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">
                {stat.value}<span className="text-lg">{locale === "zh" ? stat.zhSuffix : stat.enSuffix}</span>
              </div>
              <div className="text-sm text-muted-foreground">{t(stat.labelKey)}</div>
            </div>
          ))}
        </div>

        {/* Skills grid */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-8">
            <Code2 className="h-5 w-5 text-primary" />
            <h3 className="text-xl font-semibold text-foreground">{t("about.skillsTitle")}</h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {skillItems.map((skill) => (
              <div
                key={skill.categoryKey}
                className="group p-5 rounded-xl border border-border/50 bg-card/50 transition-smooth hover:border-primary/20 hover:shadow-glow"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary transition-smooth group-hover:bg-primary/20">
                    {skill.icon}
                  </div>
                  <h4 className="font-semibold text-foreground text-sm">{t(`about.skills.${skill.categoryKey}`)}</h4>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {skill.items.map((item) => (
                    <span
                      key={item}
                      className="px-2 py-1 text-xs rounded bg-secondary/50 text-secondary-foreground border border-border/30"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Experience timeline */}
        <div>
          <div className="flex items-center gap-2 mb-8">
            <Rocket className="h-5 w-5 text-primary" />
            <h3 className="text-xl font-semibold text-foreground">{t("about.experienceTitle")}</h3>
          </div>
          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="group relative pl-8 pb-6 border-l border-border/50 last:pb-0"
              >
                {/* Timeline dot */}
                <div className="absolute left-0 top-0 -translate-x-1/2 h-3 w-3 rounded-full bg-primary/50 border-2 border-primary transition-smooth group-hover:bg-primary group-hover:shadow-glow" />

                <div className="p-5 rounded-xl border border-border/50 bg-card/30 transition-smooth hover:border-primary/20">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                    <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded">
                      {exp.period}
                    </span>
                    <div className="flex items-center gap-2">
                      <Users className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{exp.company}</span>
                    </div>
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">{exp.role}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Collaboration styles */}
        <div className="mt-16 p-8 rounded-xl border border-border/50 gradient-card">
          <div className="flex items-center gap-2 mb-6">
            <Figma className="h-5 w-5 text-primary" />
            <h3 className="text-xl font-semibold text-foreground">{t("about.cooperationTitle")}</h3>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {cooperation.map((item, index) => (
              <div key={index} className="space-y-2">
                <h4 className="font-medium text-foreground">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}