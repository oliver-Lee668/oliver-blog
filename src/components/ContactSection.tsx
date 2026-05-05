import { Mail, MessageCircle, Github, ArrowUpRight } from "lucide-react"
import { useI18n } from "@/lib/i18n"

const EMAIL = "15322390847@163.com"
const WECHAT = "18689485626"
const GITHUB_URL = "https://github.com/oliver-Lee668"

export function ContactSection() {
  const { t } = useI18n()

  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="absolute inset-0 gradient-surface" />
      <div className="absolute inset-0 bg-grid opacity-20" />

      {/* Glow accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          {/* Header */}
          <span className="inline-block px-3 py-1 text-xs font-medium text-primary rounded-full border border-primary/20 bg-primary/5 mb-4">
            {t("contact.badge")}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("contact.title")}<span className="gradient-text">{t("contact.titleHighlight")}</span>{t("contact.titleEnd")}
          </h2>
          <p className="text-muted-foreground mb-10 max-w-lg mx-auto">
            {t("contact.subtitle")}
          </p>

          {/* Contact cards */}
          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            <a
              href={`mailto:${EMAIL}`}
              className="group flex items-center gap-4 p-5 rounded-xl border border-border/50 bg-card/50 transition-smooth hover:border-primary/20 hover:shadow-glow text-left"
            >
              <div className="p-3 rounded-lg bg-primary/10 text-primary transition-smooth group-hover:bg-primary/20">
                <Mail className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-foreground">{t("contact.email")}</div>
                <div className="text-sm text-muted-foreground truncate">{EMAIL}</div>
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-smooth group-hover:text-primary" />
            </a>

            <div
              className="group flex items-center gap-4 p-5 rounded-xl border border-border/50 bg-card/50 transition-smooth hover:border-primary/20 hover:shadow-glow text-left"
            >
              <div className="p-3 rounded-lg bg-primary/10 text-primary transition-smooth group-hover:bg-primary/20">
                <MessageCircle className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-foreground">{t("contact.wechat")}</div>
                <div className="text-sm text-muted-foreground">{WECHAT}</div>
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-smooth group-hover:text-primary" />
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center justify-center gap-2 h-14 rounded-lg px-10 text-base font-semibold gradient-primary text-primary-foreground shadow-glow hover:shadow-glow-lg transition-smooth w-full sm:w-auto"
            >
              <Mail className="h-4 w-4" />
              {t("contact.sendEmail")}
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 h-14 rounded-lg px-10 text-base glass border border-border/50 text-foreground hover:bg-secondary/40 transition-smooth w-full sm:w-auto"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}